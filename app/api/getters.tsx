// export async function getAccessibility(
//   location_id: number
// ): Promise<getAccessibilityProps> {
//   const token = (await Auth.currentSession()).getIdToken().getJwtToken();

//   return axiosInstance
//     .get(`accessibility/${location_id}`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     })
//     .then((res) => res.data)
//     .catch(handleError);
// }
