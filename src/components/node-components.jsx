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

    refreshMessages = () => {
        const interval = setInterval(() => {
            this.setState({
                messages : [{id:'1', type: 'input', data:{label:'Group Chat'}, position: {x:0,y:0}},
                    {id:'2', type: 'messageType', data:{label:'tonight on bottom gear', user: {name: 'Jeremy Clarkson', time: '4:20'}}, position: {x:5,y:5}},
                    {
                        id: 'e'+ '2' + '-' + 1,
                        source: '2',
                        target: '1',
                        animated: true,
                        style: { stroke: '#000000' },
                    },
                    {id:'3', type: 'messageType', data:{label:'i watch initial d', user: {name: 'Jeremy Clarkson', time: '4:21'}}, position: {x:100,y:100}},
                    {
                        id: 'e'+ '3' + '-' + '1',
                        source: '3',
                        target: '1',
                        animated: true,
                        style: { stroke: '#000000' },
                    },
                    {id:'4', type: 'messageType', data:{label:'richard verbally defeats a local karen', user: {name: 'Jeremy Clarkson', time: '4:21'}}, position: {x:100,y:-100}},
                    {
                        id: 'e'+ '4' + '-' + '1',
                        source: '4',
                        target: '1',
                        animated: true,
                        style: { stroke: '#000000' },
                    },
                    {id:'5', type: 'messageType', data:{label:'and james builds an 1950 Volkswagen engine out of cheese', user: {name: 'Jeremy Clarkson', time: '4:21'}}, position: {x:-100,y:100}},
                    {
                        id: 'e'+ '5' + '-' + '1',
                        source: '5',
                        target: '1',
                        animated: true,
                        style: { stroke: '#000000' },
                    },
                    {id:'6', type: 'messageType', data:{label:'*intro music*', user: {name: 'Jeremy Clarkson', time: '4:21'}}, position: {x:-100,y:-100}},
                    {
                        id: 'e'+ '6' + '-' + '1',
                        source: '6',
                        target: '1',
                        animated: true,
                        style: { stroke: '#000000' },
                    },
                ]
            })
    }, 2000)
}

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
                {this.refreshMessages()}
        </Fragment>
        )
        }

}
