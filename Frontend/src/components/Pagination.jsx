import React from "react";

class Pagination extends React.Component {
    render() {
        return (
            <center>
                {
                    this.props.pages.map(ele => (
                        <button className='ButtonLikeLinkSelected'
                            key={ele}
                            style={ele === this.props.currentPage ? { backgroundColor: '#F47C00', color: 'white' } : {}}
                            onClick={this.props.changePage.bind(this, ele)}>{ele + 1}</button>
                    ))
                }
            </center>
        )
    }
}

export default Pagination;