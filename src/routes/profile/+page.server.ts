import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
    deleteAccount: async ({ locals }) => {
        // Authentication
        if (!locals.pb.authStore.isValid || !locals.pb.authStore.record) {
            return fail(401, 'Unauthorized request.');
        }

        const userId = locals.pb.authStore.record.id;

        try {
            // Delete user from user collection
            await locals.pb.collection('users').delete(userId);

            // Clear auth store
            locals.pb.authStore.clear();
        } catch (error) {
            console.error('Error deleting account', error);
            return fail(500, 'Could not delete account');
        }

        throw redirect(303, '/');
    }
};