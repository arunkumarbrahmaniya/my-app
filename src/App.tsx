import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Paper from '@material-ui/core/Paper';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import './App.css';


class Header extends React.Component<any, any> {
  storeData = '';
  arrayResult = [];
  constructor (props:any) {
    super(props);
    this.state = {
      open:false,
      email:'',
      lastname:'',
      checkA:false,
      CheckAValue:'',
      checkB:false,
      checkC:false,
      Counter:0,
      onchangeCounter:0,
      allResult:[],
      isHideData:false,
      CalculatorFirst:'',
      CalculatorSecond:''
    };
  }
  CalculatorCount = 0;
  handleClick = () => {
    this.setState({open:true});
  }
  handleCLoseDialog = () => {
    this.setState({open:false});
  }
  handleEmailState = (evt:any) => {
    var val = evt.target.value.length;
    var count = 0;
    for (let i = 0; i< val; i++) {
      if(evt.target.value.charAt(i) === ' ') {
        count++;
      }
    }
    this.setState({onchangeCounter:count});

    this.setState({email:evt.target.value});
  }
  handleLastname = (evt:any) => {
   this.setState({lastname:evt.target.value});
  }
  handleCheckA = () => {
    if (!this.state.checkA){
      this.setState({checkA:true});
      this.setState({checkB:false});
      this.setState({checkC:false});
    } else{
      this.setState({checkA:false});
      console.log('CheckA', this.state.checkA);
    }
  }
  handleCheckB = () => {
    if (!this.state.checkB){
      this.setState({checkB:true});
      this.setState({checkA:false});
      this.setState({checkC:false});
      console.log('CheckA', this.state.checkA);
    } else{
      this.setState({checkB:false});
      console.log('CheckA', this.state.checkA);
    }
  }
  handleCount = () => {
    if(!this.state.checkC) {
      this.setState({checkC: true});
      this.setState({checkA:false});
      this.setState({checkB:false});
      console.log('checkC clicked');
    } else {
      this.setState({checkC: false});
    }
  }
  performAction = () => {
    if (this.state.checkA === true) {
      let value = this.state.email.toLowerCase();
      this.setState({email:value});
    } else if (this.state.checkB === true){
     let value = this.state.email.toUpperCase();
      this.setState({email:value});
    } else if(this.state.checkC === true){
      let count = 0;
      let value = this.state.email.length;
      for (let i=0; i < value;i++) {
        if(this.state.email.charAt(i) === ' ') {
          count++;
        }
      }
      this.setState({Counter:count});
    } 
    else {
      alert('Please Check the Switch');
    }
  }
  getData = () => {
    this.setState({isHideData:false});
    let data = fetch(`https://jsonplaceholder.typicode.com/users`);
    data.then(respone => {
      return respone.json();
    }).then(result => {
      this.setState({allResult:result});
    })
  }
  hideData = () => {
    this.setState({allResult:[]});
    this.setState({isHideData:true});
  }
  CalucatorValue = (evt:any, value:any) => {
    if (this.CalculatorCount === 0) {
    this.setState({CalculatorFirst: Number(value)});
    this.CalculatorCount++;
    }
    if (this.CalculatorCount > 0) {
      let getfirstvalue = this.state.CalculatorFirst;
      if (Number(getfirstvalue) === 0) {
        this.setState({CalculatorFirst:value});
      } else{
      getfirstvalue = getfirstvalue + Number(value);
      this.setState({CalculatorFirst:getfirstvalue});
      }
    }
  }
  handleCalculatorDelete = () => {
    this.setState({CalculatorFirst:'0'});
  }

  render() {
    console.log(`AllData`, this.state.allResult);
    return(
      <React.Fragment>
        <AppBar>
          <Toolbar>
            <MenuIcon/>
            <Typography variant="h5">
            PRINCI MIRZAPUR WALI
          </Typography>
          <div style={{ marginLeft:'60%' }}>
          <Button type="button" style={{backgroundColor:'orange',color:'white'}} onClick={this.handleClick}>Login</Button>
          <Button style={{backgroundColor:'orange',color:'white', marginLeft:10}} onClick= {this.getData}>View</Button>
          <Button style={{ backgroundColor:'orange', color:'white' }} onClick={this.hideData}>Hide Data</Button>
          </div>
          </Toolbar>
          <Dialog open={this.state.open} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send updates
            occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Sentence"
            type="text"
            value={this.state.email}
            fullWidth
            onChange={this.handleEmailState}
          />
          {
            <p>Onchange Counter = {this.state.onchangeCounter}</p>
          }
          {
          (this.state.checkC) ? <p>Total Space Found= {this.state.Counter}</p> :''
          }
          <br/>
          <TextField
          fullWidth
          margin="dense"
          id="lastname"
          label="Lastname"
          value={this.state.lastname}
          onChange={this.handleLastname}
          />
          <Switch
            checked={this.state.checkA}
            value={this.state.CheckAValue}
            inputProps={{ 'aria-label': 'secondary checkbox' }}
            onChange={this.handleCheckA}
      /> Lowercase
      <Switch
            checked={this.state.checkB}
            value={this.state.CheckAValue}
            inputProps={{ 'aria-label': 'secondary checkbox' }}
            onChange={this.handleCheckB}
      /> Uppercase
      <Switch
            checked={this.state.checkC}
            onChange={this.handleCount}
            inputProps={{ 'aria-label': 'secondary checkbox' }}
      /> Count Space
        </DialogContent>
        <DialogActions>
          <Button  color="primary" onClick={this.handleCLoseDialog}>
            Cancel
          </Button>
          <Button color="primary" onClick={this.performAction}>
            Perform Text Operation
          </Button>
        </DialogActions>
      </Dialog>
        </AppBar>
        (this.state.allResult !== '' || this.state.allResult !== undefined) ?
        (<div style={{ height:700, width:'100%', backgroundColor:'dodgerblue', marginTop:45 }}>
          <Paper style={{width:'80%', marginLeft:120}}>
          {
            (this.state.allResult.length === 0) ? '' :
          (<Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell >Name</TableCell>
            <TableCell >Username</TableCell>
            <TableCell >Website</TableCell>
            <TableCell >Email</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(this.state.isHideData) ? '' :
              this.state.allResult.map((data:any) => {
              return <TableRow>
              <TableCell>{data.id}</TableCell>
              <TableCell>{data.name}</TableCell>
              <TableCell>{data.username}</TableCell>
              <TableCell>{data.website}</TableCell>
              <TableCell>{data.email}</TableCell>
              </TableRow>
              })
          }
            </TableBody>
            </Table>)
  }
            </Paper>

            <Button style={{backgroundColor:'orange',color:'white', margin:'20px 0px 0px 20px'}}>Calculator</Button>
            <Paper style={{height:600, width:450, margin:'20px 0px 0px 20px', backgroundColor:'#ffffe6'}}>
            <TextareaAutosize
              style={{minWidth:444, maxWidth:444,
                minHeight:100, maxHeight:100,
                backgroundColor:'#f2f2f2', borderBottom:'1px solid black', 
                textAlign:'right', fontSize:50,}}
                disabled
                value={this.state.CalculatorFirst}
            />
            <div style={{marginLeft:17}}>
            <Button style={{backgroundColor:'darkgray',color:'white', height:60,
            width:100, fontSize:25, marginRight:3, marginBottom:10}}
             onClick={(e:any) => this.CalucatorValue(e,"1")}>
              1
            </Button>
            <Button style={{backgroundColor:'darkgray',color:'white', height:60,
            width:100, fontSize:25,marginRight:3,marginBottom:10}}
            onClick={(e:any) => this.CalucatorValue(e,"2")}>
              2
            </Button>
            <Button style={{backgroundColor:'darkgray',color:'white', height:60,
            width:100, fontSize:25, marginRight:3, marginBottom:10}}
            onClick={(e:any) => this.CalucatorValue(e,"3")}>
              3
            </Button>
            <Button style={{backgroundColor:'darkgray',color:'white', height:60,
            width:100, fontSize:25, marginRight:3, marginBottom:10}}>
              /
            </Button>
            <Button style={{backgroundColor:'darkgray',color:'white', height:60,
            width:100, fontSize:25, marginRight:3,marginBottom:10}}
            onClick={(e:any) => this.CalucatorValue(e,"4")}>
              4
            </Button>
            <Button style={{backgroundColor:'darkgray',color:'white', height:60,
            width:100, fontSize:25,marginRight:3, marginBottom:10}}
            onClick={(e:any) => this.CalucatorValue(e,"5")}>
              5
            </Button>
            <Button style={{backgroundColor:'darkgray',color:'white', height:60,
            width:100, fontSize:25, marginRight:3,marginBottom:10}}
            onClick={(e:any) => this.CalucatorValue(e,"6")}>
              6
            </Button>
            <Button style={{backgroundColor:'darkgray',color:'white', height:60,
            width:100, fontSize:25, marginRight:3, marginBottom:10}}>
              X
            </Button>
            <Button style={{backgroundColor:'darkgray',color:'white', height:60,
            width:100, fontSize:25, marginRight:3, marginBottom:10}}
            onClick={(e:any) => this.CalucatorValue(e,"7")}>
              7
            </Button>
            <Button style={{backgroundColor:'darkgray',color:'white', height:60,
            width:100, fontSize:25, marginRight:3,marginBottom:10}}
            onClick={(e:any) => this.CalucatorValue(e,"8")}>
              8
            </Button>
            <Button style={{backgroundColor:'darkgray',color:'white', height:60,
            width:100, fontSize:25,marginRight:3,marginBottom:10}}
            onClick={(e:any) => this.CalucatorValue(e,"9")}>
              9
            </Button>
            <Button style={{backgroundColor:'darkgray',color:'white', height:60,
            width:100, fontSize:25, marginRight:3, marginBottom:10}}>
              -
            </Button>
            <Button style={{backgroundColor:'darkgray',color:'white', height:60,
            width:100, fontSize:25, marginRight:3,marginBottom:10}}
            onClick={(e:any) => this.CalucatorValue(e,"0")}>
              0
            </Button>
            <Button style={{backgroundColor:'darkgray',color:'white', height:60,
            width:200, fontSize:25, marginRight:3,marginBottom:10}}>
              =
            </Button>
            <Button style={{backgroundColor:'darkgray',color:'white', height:60,
            width:100, fontSize:25, marginRight:3,marginBottom:10}}>
              +
            </Button>
            <Button style={{backgroundColor:'darkgray',color:'white', height:60,
            width:400, fontSize:25, marginRight:3,marginBottom:10}}
            onClick={this.handleCalculatorDelete}
            >
              C
            </Button>
            </div>
            </Paper>
        </div>

      </React.Fragment>
    )
  }
}
export default Header;
