import { CalcButton } from '../../components/CalcButton';


export const Calc = () => {
  return (
    <>
    <div style={{display:'flex', flexDirection:'row' }}>
        <div>{CalcButton('7')}</div>
        <div>{CalcButton('8')}</div>
        <div>{CalcButton('9')}</div>
    </div>
    <div style={{display:'flex', flexDirection:'row' }}>
        <div>{CalcButton('4')}</div>
        <div>{CalcButton('5')}</div>
        <div>{CalcButton('6')}</div>
    </div>
    <div style={{display:'flex', flexDirection:'row' }}>
        <div>{CalcButton('1')}</div>
        <div>{CalcButton('2')}</div>
        <div>{CalcButton('3')}</div>
    </div>
    </>
  )
}

export default Calc