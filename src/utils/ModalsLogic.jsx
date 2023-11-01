export function onDelete(roles, roleId) {
    const updatedRoles = roles.filter(role => role.id !== roleId);

    const correctedRoles = updatedRoles.map((role, index) => ({
        ...role,
        id: index + 1
    }));

    setRoles(correctedRoles);
};

export function onEdit(roles, roleToEdit, editedRole) {
    const updatedRoles = roles.map((role) =>
        role.id === roleToEdit.id ? { ...role, ...editedRole } : role
    );

    setRoles(updatedRoles);
};

export function handleClickEdit(roleEdit, id) {
    setroleToEdit(roleEdit);
    setidSelected(id);
    setEditModalOpen(true);
};

export function handleEditConfirm(editedRole) {
    try {
        onEdit(roleToEdit, editedRole);
        setEditModalOpen(false);
    } catch (error) {
        console.error('Error deleting student:', error);
    }
};

export function handleClickDelete(id) {
    setidSelected(id);
    setDeleteModalOpen(true);
};

export async function handleDeleteConfirm() {
    try {
        onDelete(idSelected)
        setDeleteModalOpen(false);
    } catch (error) {
        console.error('Error deleting student:', error);
    }
};