import '@testing-library/jest-native/extend-expect';
global.process = {
    ...global.process,
    env: {
        ...global.process.env,
        EXPO_OS: 'ios',
    },
};