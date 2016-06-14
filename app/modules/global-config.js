function whichenv() {
    if (process.env.NODE_ENV === 'production') {
        return;
    } else if (process.env.NODE_ENV === 'development') {
        return;
    }
}

const BASE_URL = whichenv();

export {BASE_URL};