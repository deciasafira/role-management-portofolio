import React, { Component } from 'react'
import {BiDetail, BiTrash, BiEdit, BiPlus, BiSave, BiShow, BiChevronLeft} from 'react-icons/bi'
import {MdKeyboardArrowRight, MdKeyboardArrowLeft} from 'react-icons/md'
import { HiDocumentAdd, HiDocumentSearch, HiPencilAlt} from 'react-icons/hi'

import { IoAddCircle } from 'react-icons/io5';
import {AiOutlineReload} from 'react-icons/ai'
 class IconComponent extends Component {
    components = {
        BiDetail : BiDetail,
        IoAddCircle:IoAddCircle,
        MdKeyboardArrowRight: MdKeyboardArrowRight,
        MdKeyboardArrowLeft: MdKeyboardArrowLeft,
        BiTrash : BiTrash,
        BiEdit : BiEdit,
        BiPlus : BiPlus,
        BiSave: BiSave,
        AiOutlineReload: AiOutlineReload,
        BiShow: BiShow,
        BiChevronLeft: BiChevronLeft,
        HiPencilAlt:HiPencilAlt,
        HiDocumentSearch: HiDocumentSearch,
        HiDocumentAdd: HiDocumentAdd,

    }

    render() {
        const Icon = this.components[this.props.name]
        return <Icon size={this.props.size} {...this.props}/>
    }
}

export default IconComponent