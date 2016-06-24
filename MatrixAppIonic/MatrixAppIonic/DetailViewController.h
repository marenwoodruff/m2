//
//  DetailViewController.h
//  MatrixAppIonic
//
//  Created by Maren Woodruff on 6/13/16.
//  Copyright © 2016 matrixapp. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface DetailViewController : UIViewController

@property (strong, nonatomic) id detailItem;
@property (weak, nonatomic) IBOutlet UILabel *detailDescriptionLabel;

@end

