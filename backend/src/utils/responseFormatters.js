export function toProjectResponse(project) {
  return {
    ...project,
    _id: String(project._id),
  };
}

export function toTeamResponse(member) {
  return {
    ...member,
    _id: String(member._id),
  };
}
