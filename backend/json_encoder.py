import datetime
from flask.json import JSONEncoder


class CustomJSONEncoder(JSONEncoder):
  "Add support for serializing timedeltas"

  def default(self, obj):
    if type(obj) == datetime.timedelta:
      return str(obj)
    elif type(obj) == datetime.datetime:
      return obj.isoformat()
    else:
      return super().default(obj)