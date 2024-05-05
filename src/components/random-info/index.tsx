export function generateLocationName() {
    const locations = ['Нью-Йорк', 'Лондон', 'Токио', 'Париж', 'Берлин'];

    const randomIndex = Math.floor(Math.random() * locations.length);

    return locations[randomIndex];
}

export function generateAvatar() {
    const avatars = [
        'https://mir-s3-cdn-cf.behance.net/project_modules/max_632/395a65148207527.62d1246c273a0.jpg',
        // 'https://mir-s3-cdn-cf.behance.net/project_modules/max_632/adb79f148207527.62d1246c256fc.jpg',
        // 'https://mir-s3-cdn-cf.behance.net/project_modules/hd/d95c1f148207527.62d1246c25004.jpg',
        // 'https://mir-s3-cdn-cf.behance.net/project_modules/max_632/eafc28148207527.62d1246c2679f.jpg',
        // 'https://mir-s3-cdn-cf.behance.net/project_modules/max_632/b602f3148207527.62d1246c2784c.jpg',
        // 'https://mir-s3-cdn-cf.behance.net/project_modules/max_632/bf2be4148207527.62d127d18c331.jpg'
    ]
    const randomIndex = Math.floor(Math.random() * avatars.length);
    return avatars[randomIndex];
}