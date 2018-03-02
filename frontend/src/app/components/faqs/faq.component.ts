import { Component, OnInit, AfterViewInit } from '@angular/core';
import { EmojiDefinitions, EmojiService } from '../../services/EmojiService';
import { SlackMessageParsingService } from '../../services/SlackMessageParsingService';
import { SlackMessagesService, MessagesResponse } from '../../services/SlackMessagesService';
import { UserService } from '../../services/UserService';
import { DisplayComment } from '../../models/DisplayComment';
import * as $ from 'jquery';
import { SlackReactionsService } from '../../services/SlackReactionsService';
import { DisplayChannel } from '../../models/DisplayChannel';
import { DisplayFaq, FaqTitle, FaqContent } from '../../models/DisplayFaq';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css'],
  providers: [EmojiDefinitions, EmojiService, SlackMessagesService, UserService,
    SlackMessageParsingService, SlackReactionsService]
})
export class FaqComponent implements AfterViewInit {
  ngAfterViewInit(): void {
  }
  constructor(private emojiDefinitions: EmojiDefinitions, private emojiService: EmojiService,
    private slackMessagesService: SlackMessagesService, private userService: UserService,
    private slackMessageParsingService: SlackMessageParsingService) {
  }


  private accordion: DisplayFaq[] = [
    new DisplayFaq(new FaqTitle("What is a dog?", ["Dogs"]), new FaqContent("A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.", ["Pawgs"]), "1"),
    new DisplayFaq(new FaqTitle("What kinds of dogs are there?", ["Kinds"]), new FaqContent("There are many breeds of dogs. Each breed varies in size and temperament. Owners often select a breed of dog that they find to be compatible with their own lifestyle and desires from a companion.", ["KindContent"]), "2"),
    new DisplayFaq(new FaqTitle("How do you acquire a dog?", ["Acquisition"]), new FaqContent("Three common ways for a prospective owner to acquire a dog is from pet shops, private owners, or shelters. A pet shop may be the most convenient way to buy a dog. Buying a dog from a private owner allows you to assess the pedigree and upbringing of your dog before choosing to take it home. Lastly, finding your dog from a shelter, helps give a good home to a dog who may not find one so readily.", ["Acquisition", "Dogs"]), "3")
  ]

  channelSelected(channel: DisplayChannel) {
    var htmlElement = document.getElementById(channel.id);
    this.changeActiveItemOnMenu(htmlElement);
    this.showContent(channel);
  }

  private showContent(channel: DisplayChannel) {
    var allChannelContents = $('.channelContent').toArray();
    allChannelContents.forEach(element => {
      if (element.id === channel.channelContentId()) {
        $(element).show();
      }
      else {
        $(element).hide();
      }
    });
  }


  private toggle(panel: DisplayFaq) {
    this.accordion.map((elem, index) => {
      if (elem !== panel) {
        console.log('elem not panel');
        elem.active = false;
      }
      else {
        if (elem.active) {
          console.log('elem is panel');
          elem.active = false;
        }
        else {
          elem.active = true;
        }
      }
    })
  }

  // private toggle(index: number) {
  //   $('.accordionItem').map((x, elem) => {
  //     if ($(elem).attr('id') === 'title-' + index) {
  //       $(elem).addClass('active');
  //     }

  //     if ($(elem).attr('id') === 'content-' + index) {
  //       $(elem).addClass('active');
  //     }
  //     else {
  //       $(elem).removeClass('active');
  //     }
  //   })
  // }

  // private toggle(index: number) {
  //   $('.accordionItem').map((x, elem) => {
  //     if ($(elem).attr('id') === 'title-' + index) {
  //       if ($(elem).hasClass('active')) {
  //         $(elem).removeClass('active');
  //       }
  //       else {
  //         $(elem).addClass('active');
  //       }
  //     }
  //     if ($(elem).attr('id') === 'content-' + index) {
  //       $(elem).addClass('active');
  //       if ($(elem).hasClass('active')) {
  //         $(elem).removeClass('active');
  //       }
  //       else {
  //         $(elem).addClass('active');
  //       }
  //       $(elem).slideToggle("fast");
  //     }
  //     else {
  //       $(elem).removeClass('active');
  //     }
  //   })
  // }

  private changeActiveItemOnMenu(item: HTMLElement) {
    $(item)
      .addClass('active')
      .closest('.ui.menu')
      .find('.item')
      .not($(item))
      .removeClass('active')
      ;
  }
}
