import { fireEvent, getByText } from "@testing-library/dom"
import '@testing-library/dom/extend-expect'
import {JSDOM} from 'jsdom'
import fs from 'fs'
import path from 'path'
import { isTypedArray } from "util/types"


// testFile => index.html을 fsNode 모듈을 사용해 가져옴. 
const testFile = fs.readFileSync(path.resolve(__dirname,'./index.html'),'utf-8');

let dom;
let container;

/** 
 *  jsdom 라이브러리르 사용해 브라우저 테스트 에뮬레이터를 설정. 
 *  jsdom을 사용해 HTM을 렌더링 하여 테스트 진행.
 *  jsdom 환경 내부에서 스크립트가 실행되도록 설정 -> runScript:'dangerously'를 지정하여, 테스트 하는 index.html 파일 내부 script 코드 해석 & 실행.
 */ 
describe('index.html',()=>{
    beforeEach(() =>{
        dom = new JSDOM(testFile,{runScripts:'dangerously'})
        container = dom.window.document.body
    })

it('renders a heading element',()=>{
    expect(container.querySelector('h1')).not.toBeNull()
    expect(getByText(container, 'Pun Generator')).toBeInTheDocument()
})

it('renders a button element', () => {
    expect(container.querySelector('button')).not.toBeNull()
    expect(getByText(container, 'Click me for a terrible pun')).toBeInTheDocument()
  })

  it('renders a new paragraph via JavaScript when the button is clicked', async () => {
    const button = getByText(container, 'Click me for a terrible pun')
    
    fireEvent.click(button)
    let generatedParagraphs = container.querySelectorAll('#container p')
    expect(generatedParagraphs.length).toBe(1)

    fireEvent.click(button)
    generatedParagraphs = container.querySelectorAll('#container p')
    expect(generatedParagraphs.length).toBe(2)

    fireEvent.click(button)
    generatedParagraphs = container.querySelectorAll('#container p')
    expect(generatedParagraphs.length).toBe(3)
  })
})