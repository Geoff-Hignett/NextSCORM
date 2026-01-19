const scormAPI = {
    configure: jest.fn(),
    initialize: jest.fn(() => ({ success: false, version: "1.2" })),
    terminate: jest.fn(),

    get: jest.fn(),
    set: jest.fn(),
    commit: jest.fn(),
};

module.exports = { scormAPI };
