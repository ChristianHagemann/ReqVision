#import "ImageProcessing.h"
#import <React/RCTLog.h>

@implementation ImageProcessing

// To export a module named ImageProcessing
RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(preprocessImage:(NSString *)URLString errorCallback:(RCTResponseSenderBlock) errorCallback successCallback:(RCTResponseSenderBlock) successCallback)
{
  RCTLogInfo(@"Pre-processing image at %@ ", URLString);
  
  if (URLString) {
    NSURL* URL = [NSURL URLWithString:URLString];
    UIImage *image = [UIImage imageWithContentsOfFile:URL.path];
  
    if (image) {
      
      
      
      successCallback(@[URLString]);
    } else {
      successCallback(@[@"IMAGE NULL"]);
    }
    //successCallback(@[[NSNull null], path]);

  } else {
    errorCallback(@[[NSNull null], @"error"]);
  }
}

@end
