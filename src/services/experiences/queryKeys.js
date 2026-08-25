export const experienceKeys = {
  all: ['experiences'],
  lists: () => [...experienceKeys.all, 'list'],
  list: (params) => [...experienceKeys.lists(), params ?? {}],
  details: () => [...experienceKeys.all, 'detail'],
  detail: (slug) => [...experienceKeys.details(), slug],
}
