const models            = require('../model');
const bv                = require('bvalid');
const invalid_model_msg = 'Model is invalid';

function lwr(v){
  if(bv.isString(v)){return v.toLowerCase()}
  return v;
}

function validModel(modelname){
  var _modelname = lwr(modelname);
  if(models[_modelname]){
    return {f:true,r:_modelname};
  } else {
    return {f:false,r:modelname};
  }
}

const Mongo = function()
{
    this.model_name = null;
    this.lean  = true;
};

Mongo.prototype.Model = function(model_name)
{
    var  _modelVal = validModel(model_name);
    this.model_name = _modelVal.r;
    if(_modelVal.f){
      this.model = models[this.model_name];
      return this
    }
    throw new Error(invalid_model_msg);
};

Mongo.prototype.Schema = function(model_name)
{
  var  _modelVal = validModel(model_name);
  model_name = _modelVal.r;
  if(_modelVal.f){
    return models[model_name];
  }
  return new Error(invalid_model_msg);
};

Mongo.prototype.insert = function ( c , cb)
{
  var model = this.model(c);
  if(bv.isFunction(cb)){
    model.save( c, function(er, resp ){
            if (er) {
              cb(er);
                return;
            }
            cb(null, resp);
    })
  } else {
    return model.save( c );
  }
}

Mongo.prototype.update = function (c, d, o, cb)
{
  cb = bv.isFunction(o) ? o : cb;
  o = (bv.isFunction(o) || bv.isUndefined(o)) ? {} : o;
  if(bv.isFunction(cb)){
    this.model.update(c, d, o, cb);
  } else {
    return this.model.update(c, d, o);
  }
}

Mongo.prototype.updateOne = function (c, d, o, cb)
{
  cb = bv.isFunction(o) ? o : cb;
  o = (bv.isFunction(o) || bv.isUndefined(o)) ? {} : o;
  if(bv.isFunction(cb)){
    this.model.updateOne(c, d, o, cb);
  } else {
    return this.model.updateOne(c, d, o);
  }
}

Mongo.prototype.findOneAndUpdate = function (c, d, o, cb)
{
  cb = bv.isFunction(o) ? o : cb;
  o = (bv.isFunction(o) || bv.isUndefined(o)) ? {} : o;
  if(bv.isFunction(cb)){
    this.model.findOneAndUpdate(c, d, o, cb);
  } else {
    return this.model.findOneAndUpdate(c, d, o);
  }
}

Mongo.prototype.findOne = function ( c, p, o, cb)
{
  cb = bv.isFunction(p) ? p : (bv.isFunction(o) ? o : cb);
  o = (bv.isFunction(o) || bv.isUndefined(o)) ? {} : o;
  p = (bv.isFunction(p) || bv.isUndefined(p)) ? {} : p;
  o.lean = this.lean;
  if(bv.isFunction(cb)){
    this.model.findOne( c, p, o, cb );
  } else {
    return this.model.findOne( c, p, o );
  }
}

Mongo.prototype.find = function ( c, p, o, cb)
{
  cb = bv.isFunction(p) ? p : (bv.isFunction(o) ? o : cb);
  o = (bv.isFunction(o) || bv.isUndefined(o)) ? {} : o;
  p = (bv.isFunction(p) || bv.isUndefined(p)) ? {} : p;
  o.lean = this.lean;
  if(bv.isFunction(cb)){
    this.model.find( c, p, o, cb );
  } else {
    return this.model.find( c, p, o );
  }
}

Mongo.prototype.findByIdAndRemove = function (c, cb)
{
  if(bv.isFunction(cb)){
    this.model.findByIdAndRemove(c, cb);
  } else {
    return this.model.findByIdAndRemove(c);
  }
}

Mongo.prototype.remove = function (c, cb)
{
  if(bv.isFunction(cb)){
    this.model.remove(c, cb);
  } else {
    return this.model.remove(c);
  }
}

Mongo.prototype.delete = function (c, cb)
{
  if(bv.isFunction(cb)){
    this.model.remove(c, cb);
  } else {
    return this.model.remove(c);
  }
}

Mongo.prototype.aggregation = function(q, cb)
{
  if(bv.isFunction(cb)){
    this.model.aggregate([q], cb);
  } else {
    return this.model.aggregate([q]);
  }
}

Mongo.prototype.count = function ( q, cb)
{
  cb = bv.isFunction(q) ? q : cb;
  q = (bv.isFunction(q) || bv.isUndefined(q)) ? {} : q;
  if(bv.isFunction(cb)){
    this.model.countDocuments( q, cb );
  } else {
    return this.model.countDocuments( q );
  }
}

module.exports = new Mongo();