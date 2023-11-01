export function sortByRoleName(roles, sortDirection) {
  return roles.slice().sort((a, b) => {
    const nameA = a.name;
    const nameB = b.name;
    return sortDirection === "asc"
      ? nameA.localeCompare(nameB)
      : nameB.localeCompare(nameA);
  });
}

export function sortByWorkset(roles, sortDirection) {
  return roles.slice().sort((a, b) => {
    const worksetA = a.worksets
      // .map((workset) => workset.workset.name)
      .map((workset) => workset.name)
      .join(", ");
    const worksetB = b.worksets
      // .map((workset) => workset.workset.name)
      .map((workset) => workset.name)
      .join(", ");
    return sortDirection === "asc"
      ? worksetA.localeCompare(worksetB)
      : worksetB.localeCompare(worksetA);
  });
}

export function sortByServices(roles, sortDirection) {
  return roles.slice().sort((a, b) => {
    // const rolesA = a.services.map((service) => service.service.name).join(", ");
    const rolesA = a.services.map((service) => service.name).join(", ");
    // const rolesB = b.services.map((service) => service.service.name).join(", ");
    const rolesB = b.services.map((service) => service.name).join(", ");
    return sortDirection === "asc"
      ? rolesA.localeCompare(rolesB)
      : rolesB.localeCompare(rolesA);
  });
}
