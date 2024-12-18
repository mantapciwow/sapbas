sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/model/odata/v2/ODataModel",
  "sap/ui/core/Fragment",
  "sap/m/MessageToast",
  "sap/m/MessageBox",
  "sap/ui/model/Sorter",
  "sap/ui/core/library"
  // "sap/ui/model/json/JSONModel"
],
  function (Controller, ODataModel, Fragment, MessageToast, MessageBox, Sorter, CoreLibrary) {
    "use strict";

    const SortOrder = CoreLibrary.SortOrder;

    return Controller.extend("reportcustomer.controller.Overview", {
      onInit: function () {
        var oModel = new ODataModel("/sap/opu/odata/sap/ZTEST_CUSTOMER_SRV/")
        this.getView().setModel(oModel);

        var oModel = this.getView().getModel();
        oModel.read("/CustomersSet", {
          success: function (oData) {
            console.log(oData);
          },
          error: function (oError) {
            console.error(oError);
          }
        });

      },

      onSort: function () {
        var oSorter = new Sorter("Gendertext", false);
        var aSorter = [];
        aSorter.push(oSorter);

        var oTable = this.getView().byId("customerTable");
        var oBinding = oTable.getBinding("items");
        oBinding.sort(aSorter);

        
      },

      // onSort: function () {
      // const oView = this.getView();
			// const oTable = oView.byId("customerTable");
			// oTable.sort(oView.byId("jeniskelamin"), SortOrder.Ascending, false);
      // },

      onSaveCustomer: function () {

        var oCustomerId = this.getView().byId("_inputCustomerID").getValue();
        var oFirstName = this.getView().byId("_inputFirstName").getValue();
        var oLastName = this.getView().byId("_inputLastName").getValue();
        var oCustomerGender = this.getView().byId("_inputCustomerGender").getValue();
        var oCustomerAge = this.getView().byId("_inputCustomerAge").getValue();
        var oCustomerEmail = this.getView().byId("_inputCustomerEmail").getValue();
        var oCustomerAddress = this.getView().byId("_inputCustomerAddress").getValue();
  
        var postData = {};
        postData.CustomerD = oCustomerId;
        postData.NameFirst = oFirstName;
        postData.NameLast = oLastName;
        postData.Gendertext = oCustomerGender;
        postData.Agex = oCustomerAge;
        postData.Email = oCustomerEmail;
        postData.AddressInfo = oCustomerAddress;
  
        this.getView().getModel().create("/CustomersSet", postData, null, 
          function (response) {
          MessageToast.show("Customer created successfully..  " + oCustomerId);
          
        },
          function (Error) {
          MessageToast.show("Customer Creation Failed  " + oCustomerId);
        });

        //======================================================
        //   var oModel = this.getView().getModel();
        //   let oBindList = oModel.bindList("/CustomersSet");
        
        //     oBindList.create({
          //         CustomerD: "customerID",
          //         NameFirst: "firstName"
          // });
          
          //=================================================
          
          // var oInput = this.byId("customerID").getValue();
          
          // var inputUser = {
            //   customerID: oInput
        // }

        // var oModel = this.getView().getModel();
        
        // oModel.create("/CustomersSet", inputUser, {
          //   success: function() {
            //     // Handle success
            //     console.log("Data sent successfully.");
            //   },
            //   error: function(oError) {
              //     // Handle error
              //     console.error("Error while sending data:", oError);
              //   }
              // })
              
              // =================================================================
              
              // var oModel = new ODataModel("/sap/opu/odata/sap/ZTEST_CUSTOMER_SRV/")
              // this.getView().setModel(oModel);
              // var oEntry = {};
              // var customerID = sap.ui.getCore().getElementById("inputCustomerID").getValue();
        // oEntry.CUSTOMER_D = customerID;

        // this.oModel.create('/CustomersSet', oEntry)

        // =================================================================

        // var oBinding = this.byId("panelCustomer").getBinding("items");

        // var oContext = oBinding.create({
        //   "CustomerD": oBinding.customerID,
        //   "NameFirst": oBinding.firstName,
        //   "NameLast": oBinding.lastName,
        //   "GenderText": oBinding.customerGender,
        //   "AgeX": oBinding.customerAge,
        //   "Email": oBinding.customerEmail,
        //   "CustomerAddress": oBinding.customerAddress
        // })

        // oContext.created().then(function() {
        //   MessageToast.show("Customer Created");
        // })

        // ================================================================

        // var oModelData = this.getView().getModel("CustomersSet").getData();

        // this.byId("panelCustomer").getBinding("items").create({
        //   "customerID": oBinding.CustomerD,
        //   "firstName": oBinding.NameFirst
        // }).created().then(function() {
        //   MessageToast.show("Customer Created");
        // })

        // ================================================================

        // var oCustomerModel = this.getView().getModel("");
        // var aCustomer = oCustomerModel.getProperty("/CustomersSet");

        // var sCustomerId = sap.ui.getCore().byId("customerID").getValue();
        // var sFirstName = sap.ui.getCore().byId("firstName").getValue();
        // var sLastName = sap.ui.getCore().byId("lastName").getValue();
        // var sCustomerGender = sap.ui.getCore().byId("customerGender").getValue();
        // var sCustomerAge = sap.ui.getCore().byId("customerAge").getValue();
        // var sCustomerEmail = sap.ui.getCore().byId("customerEmail").getValue();
        // var sCustomerAddress = sap.ui.getCore().byId("customerAddress").getValue();

        // var oNewCustomer = {
        //   "CustomerD": sCustomerId,
        //   "NameFirst": sFirstName,
        //   "NameLast": sLastName,
        //   "Gendertext": sCustomerGender,
        //   "Agex": sCustomerAge,
        //   "Email": sCustomerEmail,
        //   "AddressInfo": sCustomerAddress
        // }

        // aCustomer.push(oNewCustomer);
        // oCustomerModel.setProperty("/CustomersSet", aCustomer);

        // MessageToast.show("New Customer Added!");

        // ============================================================================

      },

      _refreshCustomerTable: function() {
        var oPanel = this.getView().byId("panelCustomer");
        // var oBinding = oTable.getBinding("items");
        oPanel.refresh();
      },

      // onTambahCustomer : function () {
      //   var oList = this.byId("customerList"),
      //     oBinding = oList.getBinding("items"),
      //     // Create a new entry through the table's list binding
      //     oContext = oBinding.create({Age : "18"});

      //   this._setUIChanges(true);
      //   this.getView().getModel("").setProperty("/usernameEmpty", true);

      //   // Select and focus the table row that contains the newly created entry
      //   oList.getItems().some(function (oItem) {
      //     if (oItem.getBindingContext() === oContext) {
      //       oItem.focus();
      //       oItem.setSelected(true);
      //       return true;
      //     }
      //   });
      // },

      // onInputChange : function (oEvt) {
      //   if (oEvt.getParameter("escPressed")) {
      //     this._setUIChanges();
      //   } else {
      //     this._setUIChanges(true);
      //   }
      // }

      // ===============================================================================

      
      onEdit: function (oEvent) {
        var oModel = this.getOwnerComponent().getModel();
        var aInput = oEvent.getSource().getParent().getParent().getCells().filter(function (oCell) { return oCell instanceof sap.m.Input; });

        if (oEvent.getSource().getText() === "Edit") {
          oEvent.getSource().setText("Submit");
          aInput.forEach(function (oInput) { oInput.setEditable(true); });
        } else {
          oEvent.getSource().setText("Edit");
          aInput.forEach(function (oInput) { oInput.setEditable(false); });

          // Gather updated data
          var oContext = oEvent.getSource().getParent().getParent().getBindingContext();
          var sPath = oContext.getPath();
          var oUpdatedData = {
            NameFirst: aInput[0].getValue().split(' ')[0],
            NameLast: aInput[0].getValue().split(' ')[1],
            Gendertext: aInput[1].getValue(),
            Agex: aInput[2].getValue(),
            Email: aInput[3].getValue(),
            AddressInfo: aInput[4].getValue()
          };

          // Update the model
          oModel.update(sPath, oUpdatedData, {
            success: function () {
              sap.m.MessageToast.show("Customer updated successfully!");
              var oRefresh = this.byId("customerTable");
              oRefresh.getBinding("items").refresh();
            }.bind(this),
            error: function () {
              sap.m.MessageToast.show("Error updating customer.");
            }
          });

          // var oId = aInput.forEach(function (oInput) { oInput.getBindingContext().getProperty(); });

          // var oId = aInput.map(function (oInput) { oInput.getBindingContext().getProperty("CustomerD"); });

          // oModel.update("/CustomersSet", oId, {
          //   success: function () {
          //     // Handle success
          //     console.log("Data sent successfully.");
          //   },
          //   error: function (oError) {
          //     // Handle error
          //     console.error("Error while sending data:", oError);
          //     console.log(oId)
          //   }
          // });

          // oModel.update("/CustomersSet('" + oId + "')", {
          //   success: function () {
          //     // Handle success
          //     console.log("Data sent successfully.");
          //   },
          //   error: function (oError) {
          //     // Handle error
          //     console.error("Error while sending data:", oError);
          //     console.log(oId)
          //   }
          // });

          // var oEntry = {}; 
          // oEntry._inputCustomerID= CustomerD;
          // oEntry._inputCustomerGender= Gendertext; 
          // oEntry._inputCustomerAge= Agex;
          // oEntry.inputCustomerEmail= Email;
          // var oModel = this.getOwnerComponent().getModel(); 
          // oModel.update("/CustomersSet(CustomerD='oEntry._inputCustomerID',Gendertext='oEntry._inputCustomerGender',Agex='_inputCustomerAge')", oEntry,{success: function() {
          //   // Handle success
          //   console.log("Data sent successfully.");
          // },
          // error: function(oError) {
          //   // Handle error
          //   console.error("Error while sending data:", oError);
          // }});

          // var oContext = aInput.getBindingContext();
          // var oData = oContext.getObject();
          // var sPath = oContext.getPath();

          // oModel.update(sPath, oData, {
          //     method: "PUT", // Use PUT instead of PATCH
          //     success: function () {
          //         console.log("Data sent successfully.");
          //     },
          //     error: function (oError) {
          //         console.error("Error while sending data:", oError);
          //     }
          // });

        }

      },

      onDelete: function (oEvent) {
        var oContext = oEvent.getSource().getBindingContext().getObject();
        MessageBox.confirm("Are you sure want to delete this record?", {
          title: "Confrim",
          onClose: function (sAction) {
            if (sAction === 'OK') {
              this.onDeleteSepcificRecord(oContext);
            }
          }.bind(this),
          actions: [sap.m.MessageBox.Action.OK,
          sap.m.MessageBox.Action.CANCEL],
          emphasizedAction: sap.m.MessageBox.Action.OK,
        });
      },

      onDeleteSepcificRecord: function (oRecord) {
        var oDataModel = this.getOwnerComponent().getModel();
        oDataModel.remove(`/CustomersSet('${oRecord.CustomerD}')`, {
          method: "DELETE",
          success: (oResponse) => {
            MessageToast.show("Customer Removed!");
          },
          error: function (oError) {
            MessageToast.show("Customer Deletion Failed");
          }
        }).refresh();

        // this.getView().getModel().remove("/CustomersSet", {
        //   CustomerD: "",
        //   NameFirst: "",
        //   NameLast: "",
        //   Gendertext: "",
        //   Agex: "",
        //   Email: "",
        //   AddressInfo: ""
        // });

        // ==================================================================

        // var oCustomerId = this.getView().byId("_inputCustomerID").getValue();
        // var sPath = "/CustomersSet('" + oCustomerId + "')";

        // this.getView().getModel().remove("/CustomersSet", postData, null, function (response) {
        //   MessageToast.show("Customer removed!" + oCustomerId);
        // }, function (Error) {
        //   MessageToast.show("Customer Deletion Failed  " + oCustomerId);
        // });

        // --------------------------------------------------------------------

        // this.getView().getModel().remove(sPath, {
        //   success: function () {
        //     MessageToast.show("Customer removed: " + oCustomerId);
        //   },
        //   error: function (oError) {
        //     MessageToast.show("customer Deletion Failed: " + oCustomerId);
        //     console.error("Error details:", oError);
        //   }
        // });

      }

    });
  });
