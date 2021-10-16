import { viteMockServe } from 'vite-plugin-mock'

export default function createMock() {
    return viteMockServe({
        mockPath: 'mock',
        injectCode: `
            import { setupProdMockServer } from './mockProdServer';
            setupProdMockServer();
        `
    })
}