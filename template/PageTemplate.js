import * as YR from "../YR";
import MyData from '../MyData';

export default class {{PageName}} extends PIXI.Container{
    constructor()
    {
        super();
        this.name="{{PageName}}";
        this.con=new PIXI.Container();
        this.gp=YR.Easy.CreateJSONGroup(window.resource["{{PageName}}"],this.con);
        this.addChild(this.con);
    }
    
    In()
    {
        
    }

    Out()
    {

    }

    resize()
    {

    }
}