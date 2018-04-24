module.exports = class Email {
  constructor(coupon) {
    this.coupon = coupon;
  }

  area() {
    return this.coupon;
  }
};
