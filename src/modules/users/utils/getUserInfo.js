export function getUserInfo(data, provider) {
    let fullName;
    let avater;

    if (provider === 'google') {
        fullName = `${data.give_name} ${data.family_name}`;
        avater = data.picture;
    } else {
        fullName = data.name;
        avater = data.picture.data.url;
    }

    return {
        fullName,
        avater,
        email: data.email,
        providerData: {
            uid: data.id,
            provider,
        }
    };
}