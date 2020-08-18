const ROLE = {};

ROLE.OWNER = {
    name: 'owner', 
    permissions: ['read', 'edit', 'delete', 'done']
}
ROLE.PARTNER = { 
    name: 'partner', 
    permissions: ['read', 'edit'] 
}
ROLE.GUEST = { 
    name: 'guest', 
    permissions: ['read'] 
}

module.exports = { ROLE: ROLE }