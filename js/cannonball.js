class Cannonball {
    constructor(x,y){
        var options={
            isStatic:true
        }
        this.r=30
        this.body=Bodies.circle(x,y,this.r,options)
        this.trajectory=[]
        World.add(world,this.body)
        this.animation=[this.image]
        this.isSink=false
        this.speed=0.05
        this.cannonballImg=loadImage("assets/cannonball.png")

    }
    animate(){
        this.speed=this.speed+0.05
    }


    shoot(){
        var radianangle=cannon.angle-30
        radianangle=radianangle*(3.14/180)
        var velocity=p5.Vector.fromAngle(radianangle)
        velocity.mult(0.5)
        Matter.Body.setStatic(this.body, false)
        Matter.Body.setVelocity(this.body,{x:velocity.x*(180/3.14), y:velocity.y*(180/3.14)})
    }

    remove(index){
        this.isSink=true
        Matter.Body.setVelocity(this.body,{x:0, y:0})
        this.animation=waterSplashAnimation
        
        setTimeout(
            ()=>{
                Matter.World.remove(world, this.body)
                delete balls[index]
            }, 1000
        )
    }


    display(){

        var pos=this.body.position
      //  var index=floor(this.speed%this.animation.length)
    var index=Math.round(random(0,3))

        push()
        imageMode(CENTER)
        image(this.animation[index],pos.x, pos.y,this.r,this.r)
        pop()

    // getting the x and y positions of the cannonball for each location and pushing them in the trajectory array one by one
        if (this.body.velocity.x>0 && this.body.position.x>10){

            var position= [this.body.position.x, this.body.position.y]
            this.trajectory.push(position)
            //this.trajectory=[[1,2],[3,4],[5,6],[7,8]]
            //saira=[watermelon, bluebrries, apple, bannana]
            //saira[1]
            //this.trajectory[0][0], this.trajectory[0][1]
            //this.trajectory[1][0], this.trajectory[1][1]
            //this.trajectory[2][0], this.trajectory[2][1]
            //this.trajectory[3][0], this.trajectory[3][1]
        } 
// setting an image at each postion in the trajectory of the cannonball 
        for (var i=0; i<this.trajectory.length;i=i+1){
            image(this.cannonballImg, this.trajectory[i][0],this.trajectory[i][1], 5,5)
        }

    }
}