export const destinationKeys = {
  all: ['destinations'],
  lists: () => [...destinationKeys.all, 'list'],
  list: (params) => [...destinationKeys.lists(), params ?? {}],
  details: () => [...destinationKeys.all, 'detail'],
  detail: (slug) => [...destinationKeys.details(), slug],
}
