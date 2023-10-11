describe('import vue component', () => {
    test('normal import as expected', async ()=> {
        const cmp = await import('../components/CreateNote.vue')
        expect(cmp).toBeDefined()
    })
})