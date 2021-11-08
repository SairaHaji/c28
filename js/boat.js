class Boat {
    constructor(x,y,w,h,boatPos, boatAnimation){
this.body=Bodies.rectangle (x,y,w,h)
this.w=w
this.y=y
this.x=x
this.h=h
this.boatPosition=boatPos
this.image=loadImage("assets/boat.png")
this.animation=boatAnimation
this.speed=0.05
this.isBroken=false
World.add (world,this.body)
    }


animate(){

    this.speed=this.speed+0.05 
}



    
    remove(index){
        this.animation=brokenBoatAnimation
        this.speed=0.05
        this.w=290
        this.h=290 
        this.isBroken=true
    setTimeout(
        ()=>{
            Matter.World.remove(world,boats[index].body)
            delete boats[index]
        }, 2000
    )
    }
    display (){

        var pos=this.body.position
      //  var index=Math.round(random(0,3))
      var index=floor(this.speed%this.animation.length)
        push()
        translate(pos.x, pos.y)
        imageMode (CENTER) 
        image(this.animation[index], 0,this.boatPosition,this.w, this.h)
        pop()
        
    }
}