/**
 * 
 * @authors hgcoder (you@example.org)
 * @version $Id$
 */
import React from 'react'
import ReactDom from 'react-dom'
console.log(React)
class Hello extends React.Component{
	render () {
		return (
			<div>{this.props.name} hgcoder</div>
		)
	}
}
ReactDom.render(<Hello name="hello" />, 
document.getElementById('reactDom'));