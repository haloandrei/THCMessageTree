import ReactFlow, {addEdge, Background, Controls, MiniMap, removeElements} from "react-flow-renderer";
import React,{Fragment} from "react";
import MessageNodeType from './message-node.js';


export default class MessageNode extends React.Component{

    state = {
        messages : [
            {id:'1', type: 'input', data:{label:'Group Chat'}, position: {x:0,y:0}},
            // {id:'2', type: 'input', data:{label:'Hello'}, position: {x:12,y:12}}
        ],
        newMessageName : "This is where the new message is accumulated",
        currentMessageId : '1'
    }

    onNodeDragStop = (event, node) => console.log('drag stop', node);

    onElementClick = (event, element) => {this.setState({currentMessageId: element.id}); console.log('click', element);}

    onElementsRemove = (elementsToRemove) =>{
        this.setState({messages :  removeElements(elementsToRemove, this.state.messages)});
    }


    initBgColor = '#1A192B';

    nodeTypes = {messageType: MessageNodeType,};

    getNewId(){
        return (this.state.messages.length + 1).toString();
    }

    onLoad(reactFlowInstance) {
        reactFlowInstance.fitView();
    }

    addNode = () => {
        let newId = this.getNewId();
        this.setState({messages : this.state.messages.concat([{
                id: newId,
                type: 'messageType',
                data: {label: this.state.newMessageName, user: {name: 'Onita Andrei, ', time: '5:33'}},
                position: {x:6,y:30} //{x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight}
            },{
                id: 'e'+this.state.currentMessageId + '-' + newId,
                source: this.state.currentMessageId ,
                target: newId,
                animated: true,
                style: { stroke: '#000000' },
            }])});
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('mount', [this.state.messages, prevProps, prevState, snapshot]);
    }

    onConnect = (params) => this.setState({messages : addEdge(params,this.state.messages)});
    //onConnect(params) { this.setState({messages : addEdge(params,this.state.messages)})} this creates it s own "this", use bind if you REALLY WANT TO HAVE FUNCTIONS

    render() {
        return(
            <Fragment>
            <ReactFlow
                elements={this.state.messages}
                onLoad={this.onLoad}
                style = {{width: '100%', height: '90vh', background: this.bgColor}}
                onConnect={this.onConnect}
                connectionLineStyle={{stroke: "#ddd", strokeWidth: 3}}
                connectionLineType="bezier"
                nodeTypes={this.nodeTypes}
                onElementClick={this.onElementClick}
                onElementsRemove={this.onElementsRemove}
                onNodeDragStop={this.onNodeDragStop}
                // snapToGrid={true}
                // snapGrid={[16,16]}
                >
                <Background
                    color ="#888"
                    gap={16}
                />
                <MiniMap
                    nodeColor={n =>{
                        if(n.type === 'input') return  'blue';
                        return '#FFCC00';
                    }}/>
                <Controls/>
            </ReactFlow>

                <div>
                    <input
                        type = "text"
                        name="title"
                        onChange={e =>  this.setState({newMessageName: e.target.value})}
                    />
                    <button
                        type="button"
                        onClick={() => this.addNode()}
                    >Add message</button>
                </div>
        </Fragment>
        )
        }

}
