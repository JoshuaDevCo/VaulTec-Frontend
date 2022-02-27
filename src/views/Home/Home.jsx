import { useDispatch,useSelector } from "react-redux";
import { Paper, Grid, Typography, Box, Zoom,Button } from "@material-ui/core";
import { formatCurrency, getDisplayBalance, trim } from "../../helpers";
import {useEffect,useCallback, useMemo} from 'react'
import { useWeb3Context } from "src/hooks/web3Context";
import "./home.scss";
import Logoimg from '../../assets/ohm/logo@2x.png'
import Bg from '../../assets/ohm/bg.png'
import img1_1 from '../../assets/ohm/1-1.png';
import img1_4 from '../../assets/ohm/1-4.png';
import CaiDan from '../../assets/ohm/tuozhuaicaidandaohang.png'
import { useState } from "react";
import discord from '../../assets/ohm/discord.png';
import styled from "styled-components";
import PdImg from '../../assets/ohm/pd.png'
import WuImg from '../../assets/ohm/wu.png'
import GuanImg from '../../assets/ohm/copy-2-3@3x.png'
import { shorten } from "../../helpers";
import { isPendingTxn, txnButtonText } from "src/slices/PendingTxnsSlice";
import { changeApproval, changeStake } from "../../slices/IdoThunk";


function Home() {
  const { provider, address, connected, connect, chainID,disconnect } = useWeb3Context();
  const [menu, setmenu] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isConnected, setConnected] = useState(connected);
  const [anchorEl, setAnchorEl] = useState(null);
  const [delayShow,setDelayShow] = useState(false)

  const stakedTotal= useSelector(state => {
    // console.error(state.app?.circVal)
    
    return state?.app?.circVal ? getDisplayBalance(state?.app?.circVal,9):null;
  });
  const pendingTransactions = useSelector(state => {
    return state.pendingTransactions;
  });
  
  const treasuryMarketValue = useSelector(state => {
    return state.app.treasuryMarketValue;
  });
  let buttonText = "Connect Wallet";
  let clickFunc = connect;

  const onComplete = useCallback(()=>{
    setDelayShow(true) 
  },[])
  const handleClick = event => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  if (isConnected) {
    buttonText = shorten(address);
    clickFunc = disconnect;
  }

  if (pendingTransactions && pendingTransactions.length > 0) {
    buttonText = "In progress";
    clickFunc = handleClick;
  }

  const open = Boolean(anchorEl);
  const id = open ? "ohm-popper-pending" : undefined;

  const primaryColor =  "#ffe300";
  const buttonStyles =
    "pending-txn-container" + (isHovering && pendingTransactions.length > 0 ? " hovered-button" : "");

  const idoBalance = useSelector(state => {
    if(state.account.ido){
      return state.account.ido.idoBalance
    }
    return null
  });
  const busdAmount = useSelector(state => {
    if(state.account.ido){
      return state.account.ido.busdAmount
    }
    return null
  });
  
  const isPay = useSelector(state => {
    if(state.account.ido){
      return state.account.ido.isPay
    }
    return null
  });
  
  const openStartTimes=useMemo(()=>{
    return 1636113600000
  },[])

  const isOpen = useMemo(() => {
    return Date.now() > openStartTimes
  },[delayShow,openStartTimes]);
  const stakingAPY = useSelector(state=>{
    return state.app.stakingAPY
  })
  
  const openIsPayTime = useMemo(()=>{
    return Date.now() < (1636113600000 + 86400000) 
  },[])
  const openOverTimes=useMemo(()=>{
    return 1636372800000 
  },[isOpen])
  const isOver = useMemo(()=>{
    return Date.now() > openOverTimes
  },[Date.now(),openOverTimes])
  
  
  useEffect(() => {
    if (address) {
      connect();
    }
  }, [address]);
  useEffect(() => {
    if (pendingTransactions.length === 0) {
      setAnchorEl(null);
    }
  }, [pendingTransactions]);

  useEffect(() => {
    setConnected(connected);
  }, [connected]);

  const ShowhideClick = () => {
    setmenu(!menu);
  }
  //支付弹窗
  const [Popup, setPopup] = useState(false);
  const PopupClick = () => {
    let timeId = null;
    if(isPay === true){
      setPopup(false)
      return
    }
    if(isConnected){
      setPopup(!Popup)
    }else{
      clickFunc()
    }
  }


  return <div className="home_gd">

    <div className="headBox">
      <img src={Logoimg} alt="" className="logo" />
      <div>
      <Button
        className={buttonStyles}
        variant="contained"
        color="secondary"
        size="large"
        style={pendingTransactions.length > 0 ? { color: primaryColor } : {}}
        onClick={clickFunc}
        onMouseOver={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        key={1}
      >
        {buttonText}
      </Button>
      </div>
      <div className="CaiDanImgBox">
        <img src={CaiDan} alt="" onClick={() => ShowhideClick()} className="caidanimg" />
      </div>
    </div>
    <div className="ul2">

    </div>
    <div className="boodyBox fxColumn">
      <img src={Bg} alt="" className="bg" />
      <div className="titleColor">
        Vault DAO
      </div>
      <div className="titleColor">
        Secure your future
      </div>
      <div style={{ height: 30 }}></div>
      <div className="contentStyle">
        Vault DAO is a decentralized reserve currency protocol based on the Vault token and aims at building a community-owned decentralized financial infrastructure for the crypto world.
      </div>
      <div className="fxBetween">
        <a href="/dashboard" className="btnBox_1">Enter App</a>
      </div>
    </div>
    <div className="bottomBor a">
      <a href="https://twitter.com/VaultTecDAO" target="_blank" className="bottomImgs a2"><img src={img1_1} alt="" className="bottomImgs2" /></a>
      <a href="https://discord.gg/xuvDACaqpR" target="_blank" className="bottomImgs a2"><img src={discord} alt="" className="bottomImgs2" /></a>
      <a href="https://t.me/VaultTecDAO" target="_blank" className="bottomImgs a"><img src={img1_4} alt="" className="bottomImgs2" /></a>
    </div>
    {menu ?
      <div className="moban" onClick={() => ShowhideClick()} >
        <div className="CaiDanlieBiao">
          <img src={Logoimg} alt="" className="logo2" />
          <div className="lis2"><a className="a" href="https://pancakeswap.finance/swap/0x2794553775D6c41f54641C464CdEF5037861A0Dd">Buy On Pancakeswap</a></div>
          <div className="lis2"><a className="a" href="https://poocoin.app/tokens/0x2794553775D6c41f54641C464CdEF5037861A0Dd">Chart</a></div>
          <div className="lis2"><a className="a" href="/bonds">Bonds</a></div>
        </div>
      </div> : null}

    {Popup ?
      <div className="Max_Box">
        <div className="Min_Box">
        <div onClick={() => PopupClick()} className="close"><img src={GuanImg} alt="" width="14px"/></div>
        <PAYSTATUS isPay={isPay} openIsPayTime={openIsPayTime} isOpen={isOpen} busdAmount={busdAmount} idoBalance={idoBalance}/>
        </div>
      </div>
      : null}


  </div>
}

export default Home;


const PAYSTATUS=({idoBalance,isPay,isOpen,busdAmount,openIsPayTime})=>{
  console.error({
    sss:isPay === true,
    isPay
  })
  if(openIsPayTime === true){
    return <PadingBaiMingDan_Box title={'ITO whitelist updating, please stay tuned with notice in the telegram group'}/>
  }
  if(idoBalance === null || isOpen === null){
    return <Pading_Box/>
  }else if(isOpen === false){
    return <PadingBaiMingDan_Box title={''}/>
  }else if(isPay === true){
    
    return <PadingBaiMingDan_Box title={'Purchased'}/>
  }else if(idoBalance >0){
    return <Inp_Box busdAmount={busdAmount} idoBalance={idoBalance}/>
  }else {
    return <PadingBaiMingDan_Box/>
  }
}
//输入框组件
function Inp_Box({idoBalance,busdAmount}) {
  const { provider, address, connected, connect, chainID,disconnect } = useWeb3Context();
  const dispatch = useDispatch();

  const pendingTransactions = useSelector(state => {
    return state.pendingTransactions;
  });
  
  const stakeAllowance = useSelector(state => {
    return state.account.ido && state.account.ido.idoAllowance;
  });
  const hasAllowance = useCallback(
    () => {
      console.error(stakeAllowance > 0)
      return stakeAllowance > 0;
    },
    [stakeAllowance],
  )
  const onSeekApproval = async token => {
    await dispatch(changeApproval({ address, token, provider, networkID: chainID }));
  }
  const onChangeStake = async action => {
    // eslint-disable-next-line no-restricted-globals
    await dispatch(changeStake({ address, action, provider, networkID: chainID }));
  };
  const onClick=()=>{

  }
  return <MinInp_Box>
    <div className="Content_Box1">
      <span>Your ITO Quota</span>
    </div>
    <div className="Content_Box2">
      <div>ITO Quota</div>
      <input type="text" placeholder={`${idoBalance}PID`} className="InpStyle" />
    </div>
    <div className="Content_Box2">
      <div>Purchase</div>
      <input type="text" placeholder={`${busdAmount}BUSD`} disabled className="InpStyle" />
    </div>
    <div className="Content_Box3">
    PIDAO project will launch on 12:00 8th Nov. 2021, you will be able to claim your PID token manually on the website. 
    </div>

    {address && hasAllowance() ? (
      <div onClick={onClick} 
      disabled={isPendingTxn(pendingTransactions, "staking")}
        onClick={() => {
          onChangeStake("stake");
        }}
      className="Content_Box4">
        {txnButtonText(pendingTransactions, "buy", "Purchase")}
    </div>
    ) : (
      <Button
        className="stake-button"
        variant="contained"
        color="primary"
        disabled={isPendingTxn(pendingTransactions, "approve_staking")}
        onClick={() => {
          onSeekApproval();
        }}
      >
        {txnButtonText(pendingTransactions, "approve", "Approve")}
      </Button>
    )}
    
  </MinInp_Box>
}

const MinInp_Box = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
`

//判定等待组件
function Pading_Box (){
  return<PadingBox>
    <PandingImg src={PdImg}/>
    <PandingContent>Evaluating, please wait a moment～</PandingContent>
  </PadingBox>
}
//判定白名单
function PadingBaiMingDan_Box ({title="You are not on the whitelist"}){
  return<PadingBox>
    <PandingImg src={WuImg}/>
    <PandingContent>{title}</PandingContent>
  </PadingBox>
}
const PadingBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`
const PandingImg = styled.img`
  /* width: 100%; */
  max-width: 332px;
`
const PandingContent = styled.div`
  color: #afb0b3;
  margin-top: 43px;
`