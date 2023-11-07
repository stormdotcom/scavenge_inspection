import _ from "lodash";
import { KEY_USER_TYPE } from "../common/constants";

// export const checkUserTypeMenuPermissions = (routes, userPermissions) => {
//     if (userPermissions.includes(USER_TYPE_PERMISSIONS.ADMIN)) {
//         return routes;
//     }

//     let response = [];

//     routes.forEach(route => {
//         let childRoutes = [];
//         let hasChildren = route.children && route.children.length > 0;
//         let permissions = RESOURCE_PERMISSIONS[route.id || ""] || [];
//         if (permissions.length) {
//             let currentPermission = permissions.some(p => userPermissions.includes(p));
//             if (currentPermission) {
//                 if (hasChildren) {
//                     let checkedPermissions = checkUserTypeMenuPermissions(route.children, userPermissions) || [];
//                     if (checkedPermissions.length > 0) {
//                         childRoutes.push({
//                             ...route,
//                             children: checkedPermissions
//                         });
//                     }
//                 } else {
//                     childRoutes.push(route);
//                 }
//             }
//         } else {
//             if (hasChildren) {
//                 let checkedPermissions = checkUserTypeMenuPermissions(route.children, userPermissions) || [];
//                 if (checkedPermissions.length > 0) {
//                     childRoutes.push({
//                         ...route,
//                         children: checkedPermissions
//                     });
//                 }
//             } else {
//                 childRoutes.push(route);
//             }
//         }
//         if (childRoutes.length) {
//             response.push(...childRoutes);
//         }
//     });
//     return response;
// };


export const routePermission = (user = {}, routes = []) => {
    let newRoutes = _.cloneDeep(routes[0]);
    let newChildren = [];
    const { userType = KEY_USER_TYPE.VESSEL } = user;
    routes[0].children.map((child = []) => {
        // eslint-disable-next-line no-console
        let currentPath = _.get(child, "path", "");
        if (userType === KEY_USER_TYPE.ADMIN && _.get(child, "path", "") === "admin") {
            newChildren.push(child);

        }
        if (userType === KEY_USER_TYPE.ORG && _.get(child, "path") === "org") {
            newChildren.push(child);
        }
        if (userType === KEY_USER_TYPE.VESSEL && !currentPath.includes("org") && !currentPath.includes("admin")) {
            newChildren.push(child);
        }
    });
    _.set(newRoutes, "children", newChildren);
    return [newRoutes, routes[1], routes[2]];
};
