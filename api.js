const personalKey = "alexandr-trankov";
const defaultKey = "prod"
const baseHost = "https://webdev-hw-api.vercel.app";
const postsHost = `${baseHost}/api/v1/${defaultKey}/instapro`;

export function getPosts({ token }) {
    return fetch(postsHost, {
        method: "GET",
        headers: {
            Authorization: token,
        },
    })
        .then((response) => {
            if (response.status === 401) {
                throw new Error("Нет авторизации");
            }

            return response.json();
        })
        .then((data) => {
            return data.posts;
        });
}

export function getUserPosts({ token, userId }) {
    return fetch(postsHost + `/user-posts/${userId}`, {
        method: "GET",
        headers: {
            Authorization: token,
        },
    })
        .then((response) => {
            if (response.status === 401) {
                throw new Error("Нет авторизации");
            }

            return response.json();
        })
        .then((data) => {
            return data.posts;
        });
}

export const addPost = ({ token, description, imageUrl }) => {
    return fetch(postsHost, {
        method: "POST",
        body: JSON.stringify({
            description: description.replaceAll(/</g, "&lt;")
                .replaceAll(/>/g, "&gt;")
                .replaceAll('&', '&amp;')
                .replaceAll('"', '&quot;'),
            imageUrl,
        }),
        headers: {
            Authorization: token,
        },
    })
        .then((response) => {
            if (response.status === 400) {
                alert("Выберите фото и добавьте комментарий");
                throw new Error("Выберите фото и добавьте комментарий");
            }

            return response.json();
        })
}

export const setLike = ({ token, postId }) => {
    return fetch(postsHost + '/' + postId + "/like", {
        method: "POST",
        headers: {
            Authorization: token,
        },
    })
        .then((response) => {
            if (response.status === 401) {
                alert('Лайкать посты могут только авторизованные пользователи');
                throw new Error("Нет авторизации");
            }

            return response.json();
        })
}

export const removeLike = ({ token, postId }) => {
    return fetch(postsHost + '/' + postId + "/dislike", {
        method: "POST",
        headers: {
            Authorization: token,
        },
    })
        .then((response) => {
            if (response.status === 401) {
                throw new Error("Нет авторизации");
            }

            return response.json();
        })
}

export function registerUser({ login, password, name, imageUrl }) {
    return fetch(baseHost + "/api/user", {
        method: "POST",
        body: JSON.stringify({
            login: login.replaceAll(/</g, "&lt")
                .replaceAll(/>/g, "&gt")
                .replaceAll("&", "&amp;")
                .replaceAll('"', "&quot;"),
            password: password.replaceAll("<", "&lt")
                .replaceAll(/>/g, "&gt")
                .replaceAll("&", "&amp;")
                .replaceAll('"', "&quot;"),
            name: name.replaceAll("<", "&lt")
                .replaceAll(/>/g, "&gt")
                .replaceAll("&", "&amp;")
                .replaceAll('"', "&quot;"),
            imageUrl,
        }),
    }).then((response) => {
        if (response.status === 400) {
            throw new Error("Такой пользователь уже существует");
        }
        return response.json();
    });
}

export function loginUser({ login, password }) {
    return fetch(baseHost + "/api/user/login", {
        method: "POST",
        body: JSON.stringify({
            login: login.replaceAll("<", "&lt")
                .replaceAll(">", "&gt")
                .replaceAll("&", "&amp;")
                .replaceAll('"', "&quot;"),
            password: password.replaceAll("<", "&lt")
                .replaceAll(">", "&gt")
                .replaceAll("&", "&amp;")
                .replaceAll('"', "&quot;"),
        }),
    }).then((response) => {
        if (response.status === 400) {
            throw new Error("Неверный логин или пароль");
        }
        return response.json();
    });
}

// Загружает картинку в облако, возвращает url загруженной картинки
export function uploadImage({ file }) {
    const data = new FormData();
    data.append("file", file);

    return fetch(baseHost + "/api/upload/image", {
        method: "POST",
        body: data,
    }).then((response) => {
        return response.json();
    });
}