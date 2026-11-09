import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals }) => {
    // Authentication
    if (!locals.pb.authStore.isValid || !locals.pb.authStore.record) {
        throw error(401, 'Unauthorized request.');
    }
};