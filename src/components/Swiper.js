import _ from "lodash";
import Vue from 'vue';
import './swiper.css';
import { debug } from "util";
export default Vue.component('my-swiper', {
    data() {
        return {
            startX: "",
            startY: "",
            startTime: "",
            width: 0,
            height: 0,
            maxWidth: 0,
            minWidth: 0,
            swiperStyle: {},
            curTransform: 0,
            activeIndex: 0
        };
    },
    props: {
        isLoop: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        touchStart(event) {
            let touch = event.touches[0];
            this.startX = touch.pageX;
            this.startY = touch.pageY;
            this.startTime = event.timeStamp;
        },
        touchMove(event) {
            event.preventDefault();
            event.stopPropagation();
            let touch = event.touches[0];
            let moveDistance = touch.pageX - this.startX;
            if (this.isLoop) {
                if (this.curTransform === this.maxWidth) {
                    this.curTransform = -this.width;
                    this.activeIndex -= 1;
                } else if (this.curTransform === this.minWidth) {
                    this.curTransform = this.maxWidth + this.width;
                    this.activeIndex = 0;
                }
            }
            moveDistance = (moveDistance > 0 ? 1 : -1) * Math.min(Math.abs(moveDistance), this.width * 1.6);
            this.setStyle("move", moveDistance);
        },
        touchEnd(event) {
            let isChange, touch = event.changedTouches[0];
            let moveDistance = touch.pageX - this.startX;
            if (this.isLoop) {
                moveDistance = (moveDistance > 0 ? 1 : -1) * Math.min(Math.abs(moveDistance), this.width * 1.2);
            }
            // if ((isChange = Math.round(moveDistance / this.width)) !== 0) {
            //     console.log('change', isChange);
            // }
            this.setStyle("end", moveDistance);
        },
        setStyle(type, move, time = 1000) {
            let posX = this.curTransform + move;
            if (type === "move") {
                this.swiperStyle = {
                    transition: "",
                    transform: `translate3d(${posX}px,0,0)`
                };
            } else if (type === "end") {
                posX = Math.round(posX / this.width) * this.width;
                posX = this.isLoop ? posX : Math.min(0, Math.max(this.maxWidth, posX));
                this.swiperStyle = {
                    transition: `transform ${time}ms cubic-bezier(0.19, 1, 0.22, 1)`,
                    transform: `translate3d(${posX}px,0,0)`
                };
                this.curTransform = posX;
                this.activeIndex = this.getActiveIndex(posX);
                console.log('end--->', this.activeIndex);
            }
        },
        getActiveIndex(posX) {
            let index;
            if (this.isLoop) {
                if (posX === this.minWidth) {
                    index = -(this.maxWidth + 2 * this.width) / this.width;
                } else if (posX === this.maxWidth) {
                    index = 0;
                } else {
                    index = Math.abs(posX + this.width) / this.width;
                }
            } else {
                index = Math.abs(posX / this.width);
            }
            return index;
        }
    },
    mounted() {
        let swiper = this.$el;
        let { width, height } = window.getComputedStyle(swiper);
        this.width = parseInt(width);
        this.height = parseInt(height);
        this.maxWidth = -this.width * (swiper.children.length - 1);
        this.minWidth = 0;
        if (this.isLoop) {
            this.swiperStyle = {
                transform: `translate3d(${-1 * this.width}px ,0,0)`
            }
            this.curTransform = -1 * this.width;
        }
        this.activeIndex = 0;
    },
    render: function(createElement) {
        let swiperItems = this.$slots.default,
            lastItem, firstItem, showSwiperItems;
        if (this.isLoop) {
            lastItem = deepClone(_.last(swiperItems), createElement);
            firstItem = deepClone(_.first(swiperItems), createElement);
            showSwiperItems = [lastItem, swiperItems, firstItem];
        } else {
            showSwiperItems = swiperItems;
        }
        return createElement(
            'div', {
                class: 'my-swiper',
                on: {
                    touchstart: this.touchStart,
                    touchmove: this.touchMove,
                    touchend: this.touchEnd
                },
                ref: 'swiper',
                style: this.swiperStyle
            }, showSwiperItems
        );
    },
});

function deepClone(vnodes, createElement) {

    function cloneVNode(vnode) {
        const clonedChildren = vnode.children && vnode.children.map(vnode => cloneVNode(vnode));
        const cloned = createElement(vnode.tag, vnode.data, clonedChildren);
        cloned.text = vnode.text;
        cloned.isComment = vnode.isComment;
        cloned.componentOptions = vnode.componentOptions;
        cloned.elm = vnode.elm;
        cloned.context = vnode.context;
        cloned.ns = vnode.ns;
        cloned.isStatic = vnode.isStatic;
        cloned.key = vnode.key;
        return cloned;
    }

    vnodes = _.isArray(vnodes) ? vnodes : Array.of(vnodes);
    const clonedVNodes = vnodes.map(vnode => cloneVNode(vnode))
    return clonedVNodes;
}