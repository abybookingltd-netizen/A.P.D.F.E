/**
 * Route Configuration for Role-Based Access Control
 * 
 * This file defines which user roles can access which dashboard routes.
 * - admin: Full access to all routes
 * - helper: Limited access (no financial/management pages)
 */

export type UserRole = 'admin' | 'helper';

export interface RoutePermission {
    path: string;
    allowedRoles: UserRole[];
}

/**
 * Dashboard route permissions
 * Routes not listed here are accessible to all authenticated users
 */
export const dashboardRoutePermissions: RoutePermission[] = [
    // Routes accessible to both admin and helper
    {
        path: '/dashboard',
        allowedRoles: ['admin', 'helper'],
    },
    {
        path: '/dashboard/projects',
        allowedRoles: ['admin', 'helper'],
    },
    {
        path: '/dashboard/news',
        allowedRoles: ['admin', 'helper'],
    },
    {
        path: '/dashboard/gallery',
        allowedRoles: ['admin', 'helper'],
    },
    {
        path: '/dashboard/events',
        allowedRoles: ['admin', 'helper'],
    },
    {
        path: '/dashboard/profile',
        allowedRoles: ['admin', 'helper'],
    },

    // Admin-only routes (financial and management)
    {
        path: '/dashboard/volunteers',
        allowedRoles: ['admin'],
    },
    {
        path: '/dashboard/donations',
        allowedRoles: ['admin'],
    },
    {
        path: '/dashboard/finance',
        allowedRoles: ['admin'],
    },
    {
        path: '/dashboard/staff',
        allowedRoles: ['admin'],
    },
    {
        path: '/dashboard/helpers',
        allowedRoles: ['admin'],
    },
];

/**
 * Check if a user role has access to a specific route
 */
export const canAccessRoute = (path: string, userRole: UserRole): boolean => {
    const routePermission = dashboardRoutePermissions.find(
        (route) => route.path === path
    );

    // If route is not in the permissions list, allow access (default behavior)
    if (!routePermission) {
        return true;
    }

    // Check if user's role is in the allowed roles
    return routePermission.allowedRoles.includes(userRole);
};

/**
 * Get all accessible routes for a specific role
 */
export const getAccessibleRoutes = (userRole: UserRole): string[] => {
    return dashboardRoutePermissions
        .filter((route) => route.allowedRoles.includes(userRole))
        .map((route) => route.path);
};
