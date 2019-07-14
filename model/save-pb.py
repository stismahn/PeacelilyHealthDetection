import tensorflow as tf

import time

saved_model_path = "./saved_models/"+str(int(time.time()))
tf.contrib.saved_model.save_keras_model(model, saved_model_path)