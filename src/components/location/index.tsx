export function generateLocationName() {
    const locations = ['Нью-Йорк', 'Лондон', 'Токио', 'Париж', 'Берлин'];

    const randomIndex = Math.floor(Math.random() * locations.length);

    return locations[randomIndex];
}