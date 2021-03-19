export const mapRole = (role) => {
    switch(role) {
        case "ROLE_ADMIN": return "admin";
        case "ROLE_USER": return "user";
        default: return "undefined";
    }
};