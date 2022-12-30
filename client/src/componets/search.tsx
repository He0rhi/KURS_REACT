import React,{Component} from "react";
import { connect } from "react-redux";
class Search extends Component{
    constructor(props:any){
        super(props)
        this.state={
            value:''
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)

    }
    handleChange(event:any){
        this.setState({
            value:event.target.value
        })
    }
    handleSubmit(event:any){
        this.setState({
            value:event.target.value
        })
    }
    render(): React.ReactNode {
        return(
            <div className="well-blosd">
                <h3 className="lead">Quick shop</h3>
                <div className="input-group">
                    <form onClick={this.handleSubmit} >
                        <input onChange={this.handleChange}
                        type='text'
                        className="form-control"
                        />
                    </form>
                    <span className="input-group-btn">
                        <button className="btn btn-default">
                            <span className="glyphicon glyphicon-search"></span>
                        </button>
                    </span>
                </div>
            </div>
        )
    }
}
const mapDispatchToProps={
    
}
export default connect(null, mapDispatchToProps)( Search);