import { Ticker, Graphics, Point, Filter } from 'pixi.js'

import vShader from '~/src/assets/shaders/test.vert'
import fShader from '~/src/assets/shaders/test.frag'
import { PixijsEntity } from '../abstract/pixijsEntity'
import { View } from '../static/view'

export class WavyEntity extends PixijsEntity<Graphics> {

    private elapsed: number
    private uniforms: { dimensions: number[] }
    private pointQuota = 0.0
    
    public points: Point[] = []

    constructor (ticker: Ticker) {
        super(ticker, new Graphics())
        this.elapsed = 0.0
        this.uniforms = { dimensions: [View.element.width, View.element.height] }
        this.filters = [
            new Filter(vShader, fShader, this.uniforms)
        ]
    }

    override update = (delta: number) => {
        this.elapsed += delta
        
        this.uniforms.dimensions = [View.element.width, View.element.height]
        
        this.pointQuota -= delta
        if (this.pointQuota < 0.0) {
            const smoothOffset = (
                Math.sin((250 + this.elapsed) / 50.0)
                + Math.sin(Math.PI * (250 + this.elapsed) / 100.0)
            ) / 4.0 * 0.6
            this.points.push(new Point(0.5 + smoothOffset, -0.3))
            this.pointQuota = 6.0
        }
        
        this.points.forEach((point, index) => {
            point.y += delta * 0.008
            if (point.y > View.ratio() + 0.3) {
                this.points.splice(index, 1)
            }
        })
        
        this.object.clear()
        this.object.lineStyle(View.scale(0.2), 0xAA7777)
        this.object.moveTo(View.scale(0.5), View.scale(View.ratio() + 0.3))
        this.points.forEach(point => this.object.lineTo(View.scale(point.x), View.scale(point.y)))
    }
}
