export const getRandomUID = () => {
    const limit = 1000000
    return Math.ceil(Math.random() * limit)
}