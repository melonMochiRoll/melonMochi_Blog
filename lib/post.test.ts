import { parseTOC } from "./post";

describe('parseTOC', () => {

  it('h2, h3에 따른 들여쓰기 구분', async () => {
    const content = `

      ## title

      asdfksdchalnv
      sdfksdfnmcsdssdfdsf

      ### title22

      sdfkdsnfdkcndmfvnvsxd
      cvksdkfsdnfdssk

      ## title33
    `;

    const expected = [
      {
        id: '#title',
        title: 'title',
        indent: 0,
      },
      {
        id: '#title22',
        title: 'title22',
        indent: 1,
      },
      {
        id: '#title33',
        title: 'title33',
        indent: 0,
      },
    ];

    expect(await parseTOC(content)).toStrictEqual(expected);
  });
});