export const reviewKeys = {
  all: ['reviews'],
  forTarget: (targetType, targetId) => [...reviewKeys.all, targetType, targetId],
}
