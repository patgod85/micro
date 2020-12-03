
const mapping = {
    "hat": { port: 3010, host: "http://localhost" },
    "static": { port: 5151, host: "http://localhost" },
    "composer": { port: 3000, host: "http://localhost" },
}

module.exports = function (name) {
    if (typeof mapping[name] === 'undefined') {
        throw 'Неизвестный сервис'
    }

    const service = mapping[name];

    return {
        port: service.port,
        url: `${service.host}:${service.port}`
    }
}