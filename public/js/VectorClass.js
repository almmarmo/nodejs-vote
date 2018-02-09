class Vector {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    get X() {
        return this.x;
    }
    set X(value) {
        this.x = value;
    }
    get Y() {
        return this.y;
    }
    set Y(value) {
        this.y = value;
    }
    get Z() {
        return this.z;
    }
    set Z(value) {
        this.z = value;
    }

    copyVector(value) {
        this.x = value.X;
        this.y = value.Y;
        this.z = value.Z
    }

    getForceValue() {
        return Math.sqrt(this.x ^ 2 + this.y ^ 2 + this.z ^ 2);
    }

    getMovementVector(vector) {
        return new Vector(this.x - vector.X, this.y - vector.Y, this.z - vector.Z);
    }
}