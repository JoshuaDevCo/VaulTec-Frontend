import img1_1 from '../../assets/ohm/1-1.png';
import img1_2 from '../../assets/ohm/1-2.png';
import img1_4 from '../../assets/ohm/1-4.png';
import discord from '../../assets/ohm/discord.png';

export default function Social() {
  return (
    <div className="social-row " >
      <a href="https://twitter.com/VaultTecDAO" target="_blank" className="bottomImgs" style={{marginLeft:5,marginRight:15}}><img src={img1_1} alt="" className="bottomImgs2" style={{width:30,height:30}}/></a>
      <a href="https://discord.gg/9xnvGRx9Nx" target="_blank" className="bottomImgs" style={{marginLeft:15,marginRight:15}}><img src={discord} alt="" className="bottomImgs2" style={{width:30,height:30}}/></a>
      <a href="https://t.me/VaultTecDAO" target="_blank" className="bottomImgs" style={{marginLeft:15,marginRight:15}}><img src={img1_4} alt="" className="bottomImgs2" style={{width:30,height:30}}/></a>
    </div>
  );
}
