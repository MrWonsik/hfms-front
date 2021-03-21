export const mapRoleToString = (role) => {
    switch(role) {
        case "ROLE_ADMIN": return "admin";
        case "ROLE_USER": return "user";
        default: return "undefined";
    }
};

export const mapRoleToDomain = (role) => {
    switch(role) {
        case "admin": return "ROLE_ADMIN";
        case "user": return "ROLE_USER";
        default: return "undefined";
    }
}