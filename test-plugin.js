var conversation;

function unassign() {
  Front.unassign(conversation);
}

function toggleArchive() {
  Front.toggleArchive(conversation);
}

function toggleTrashed() {
  Front.toggleTrashed(conversation);
}

function reply() {
  Front.reply({
    body: 'Template reply',
    subject: 'Template subject',
  }, false, conversation);
}

function alertDialog() {
  console.log("in alert");
  Front.dialog('alert', {
    title: 'I\'m an alert dialog',
    message: 'You are now alerted',
  }, function () {
    console.log('Alert closed');
  });
}

function confirmDialog() {
  Front.dialog('confirm', {
    title: 'I\'m a confirm dialog',
    message: 'Do you confirm',
    okTitle: 'OK Button',
    cancelTitle: 'Cancel Button'
  }, function (confirmed) {
    if (confirmed)
      console.log('User confirmed');
    else
      console.log('User cancelled');
  });
}

function promptDialog(emailId) {
  Front.dialog('prompt', {
    title: 'Email id of booking',
    message: 'Is the booking Email Id = '+emailId + '? If no, then input the booking email id'
  }, function (data) {
    if (data)
      return data;
    else
      return emailId
  });
}

function fetchTeammates() {
  Front.fetchAllowedTeammates(function (teammates) {
    if (!teammates)
      return;

    console.log(teammates);
  });
}

function fetchInboxes() {
  Front.fetchInboxes(function (inboxes) {
    if (!inboxes)
      return;

    console.log(inboxes);
  });
}

function fetchBookingInfo(){
  if(conversation){
    bookingEmail = conversation.message.from.handle;
    var bookingEmailId = promptDialog(conversation.message.from.handle);
    
  }
}

Front.on('conversation', function (data) {
  console.log('Conversation', data.conversation);
  console.log('Contact', data.contact);
  console.log('Message', data.message);
  console.log('OtherMessages', data.otherMessages);
  conversation = data.conversation;
});
