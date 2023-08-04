// automatically generated by the FlatBuffers compiler, do not modify


#ifndef FLATBUFFERS_GENERATED_ACTIONPACKET_GAMIUM_PROTOCOL_PACKETS_H_
#define FLATBUFFERS_GENERATED_ACTIONPACKET_GAMIUM_PROTOCOL_PACKETS_H_

#include "flatbuffers/flatbuffers.h"

// Ensure the included flatbuffers.h is the same version as when this file was
// generated, otherwise it may not be compatible.
static_assert(FLATBUFFERS_VERSION_MAJOR == 22 &&
              FLATBUFFERS_VERSION_MINOR == 10 &&
              FLATBUFFERS_VERSION_REVISION == 26,
             "Non-compatible flatbuffers version included");

#include "app_action_generated.h"
#include "input_action_generated.h"
#include "player_action_generated.h"
#include "sleep_action_generated.h"
#include "errors_generated.h"

namespace Gamium {
namespace Protocol {
namespace Packets {

struct ActionParamSingle;
struct ActionParamSingleBuilder;
struct ActionParamSingleT;

struct ActionResult;
struct ActionResultBuilder;
struct ActionResultT;

struct ActionsParam;
struct ActionsParamBuilder;
struct ActionsParamT;

struct ActionsResult;
struct ActionsResultBuilder;
struct ActionsResultT;

inline const flatbuffers::TypeTable *ActionParamSingleTypeTable();

inline const flatbuffers::TypeTable *ActionResultTypeTable();

inline const flatbuffers::TypeTable *ActionsParamTypeTable();

inline const flatbuffers::TypeTable *ActionsResultTypeTable();

enum class ActionParam : uint8_t {
  NONE = 0,
  Actions_SleepParam = 1,
  Actions_InputKeyParam = 2,
  Actions_InputMouseParam = 3,
  Actions_InputSetTextParam = 4,
  Actions_MovePlayerParam = 5,
  Actions_AppQuitParam = 6,
  MIN = NONE,
  MAX = Actions_AppQuitParam
};

inline const ActionParam (&EnumValuesActionParam())[7] {
  static const ActionParam values[] = {
    ActionParam::NONE,
    ActionParam::Actions_SleepParam,
    ActionParam::Actions_InputKeyParam,
    ActionParam::Actions_InputMouseParam,
    ActionParam::Actions_InputSetTextParam,
    ActionParam::Actions_MovePlayerParam,
    ActionParam::Actions_AppQuitParam
  };
  return values;
}

inline const char * const *EnumNamesActionParam() {
  static const char * const names[8] = {
    "NONE",
    "Actions_SleepParam",
    "Actions_InputKeyParam",
    "Actions_InputMouseParam",
    "Actions_InputSetTextParam",
    "Actions_MovePlayerParam",
    "Actions_AppQuitParam",
    nullptr
  };
  return names;
}

inline const char *EnumNameActionParam(ActionParam e) {
  if (flatbuffers::IsOutRange(e, ActionParam::NONE, ActionParam::Actions_AppQuitParam)) return "";
  const size_t index = static_cast<size_t>(e);
  return EnumNamesActionParam()[index];
}

template<typename T> struct ActionParamTraits {
  static const ActionParam enum_value = ActionParam::NONE;
};

template<> struct ActionParamTraits<Gamium::Protocol::Packets::Actions::SleepParam> {
  static const ActionParam enum_value = ActionParam::Actions_SleepParam;
};

template<> struct ActionParamTraits<Gamium::Protocol::Packets::Actions::InputKeyParam> {
  static const ActionParam enum_value = ActionParam::Actions_InputKeyParam;
};

template<> struct ActionParamTraits<Gamium::Protocol::Packets::Actions::InputMouseParam> {
  static const ActionParam enum_value = ActionParam::Actions_InputMouseParam;
};

template<> struct ActionParamTraits<Gamium::Protocol::Packets::Actions::InputSetTextParam> {
  static const ActionParam enum_value = ActionParam::Actions_InputSetTextParam;
};

template<> struct ActionParamTraits<Gamium::Protocol::Packets::Actions::MovePlayerParam> {
  static const ActionParam enum_value = ActionParam::Actions_MovePlayerParam;
};

template<> struct ActionParamTraits<Gamium::Protocol::Packets::Actions::AppQuitParam> {
  static const ActionParam enum_value = ActionParam::Actions_AppQuitParam;
};

template<typename T> struct ActionParamUnionTraits {
  static const ActionParam enum_value = ActionParam::NONE;
};

template<> struct ActionParamUnionTraits<Gamium::Protocol::Packets::Actions::SleepParamT> {
  static const ActionParam enum_value = ActionParam::Actions_SleepParam;
};

template<> struct ActionParamUnionTraits<Gamium::Protocol::Packets::Actions::InputKeyParamT> {
  static const ActionParam enum_value = ActionParam::Actions_InputKeyParam;
};

template<> struct ActionParamUnionTraits<Gamium::Protocol::Packets::Actions::InputMouseParamT> {
  static const ActionParam enum_value = ActionParam::Actions_InputMouseParam;
};

template<> struct ActionParamUnionTraits<Gamium::Protocol::Packets::Actions::InputSetTextParamT> {
  static const ActionParam enum_value = ActionParam::Actions_InputSetTextParam;
};

template<> struct ActionParamUnionTraits<Gamium::Protocol::Packets::Actions::MovePlayerParamT> {
  static const ActionParam enum_value = ActionParam::Actions_MovePlayerParam;
};

template<> struct ActionParamUnionTraits<Gamium::Protocol::Packets::Actions::AppQuitParamT> {
  static const ActionParam enum_value = ActionParam::Actions_AppQuitParam;
};

struct ActionParamUnion {
  ActionParam type;
  void *value;

  ActionParamUnion() : type(ActionParam::NONE), value(nullptr) {}
  ActionParamUnion(ActionParamUnion&& u) FLATBUFFERS_NOEXCEPT :
    type(ActionParam::NONE), value(nullptr)
    { std::swap(type, u.type); std::swap(value, u.value); }
  ActionParamUnion(const ActionParamUnion &);
  ActionParamUnion &operator=(const ActionParamUnion &u)
    { ActionParamUnion t(u); std::swap(type, t.type); std::swap(value, t.value); return *this; }
  ActionParamUnion &operator=(ActionParamUnion &&u) FLATBUFFERS_NOEXCEPT
    { std::swap(type, u.type); std::swap(value, u.value); return *this; }
  ~ActionParamUnion() { Reset(); }

  void Reset();

  template <typename T>
  void Set(T&& val) {
    typedef typename std::remove_reference<T>::type RT;
    Reset();
    type = ActionParamUnionTraits<RT>::enum_value;
    if (type != ActionParam::NONE) {
      value = new RT(std::forward<T>(val));
    }
  }

  static void *UnPack(const void *obj, ActionParam type, const flatbuffers::resolver_function_t *resolver);
  flatbuffers::Offset<void> Pack(flatbuffers::FlatBufferBuilder &_fbb, const flatbuffers::rehasher_function_t *_rehasher = nullptr) const;

  Gamium::Protocol::Packets::Actions::SleepParamT *AsActions_SleepParam() {
    return type == ActionParam::Actions_SleepParam ?
      reinterpret_cast<Gamium::Protocol::Packets::Actions::SleepParamT *>(value) : nullptr;
  }
  const Gamium::Protocol::Packets::Actions::SleepParamT *AsActions_SleepParam() const {
    return type == ActionParam::Actions_SleepParam ?
      reinterpret_cast<const Gamium::Protocol::Packets::Actions::SleepParamT *>(value) : nullptr;
  }
  Gamium::Protocol::Packets::Actions::InputKeyParamT *AsActions_InputKeyParam() {
    return type == ActionParam::Actions_InputKeyParam ?
      reinterpret_cast<Gamium::Protocol::Packets::Actions::InputKeyParamT *>(value) : nullptr;
  }
  const Gamium::Protocol::Packets::Actions::InputKeyParamT *AsActions_InputKeyParam() const {
    return type == ActionParam::Actions_InputKeyParam ?
      reinterpret_cast<const Gamium::Protocol::Packets::Actions::InputKeyParamT *>(value) : nullptr;
  }
  Gamium::Protocol::Packets::Actions::InputMouseParamT *AsActions_InputMouseParam() {
    return type == ActionParam::Actions_InputMouseParam ?
      reinterpret_cast<Gamium::Protocol::Packets::Actions::InputMouseParamT *>(value) : nullptr;
  }
  const Gamium::Protocol::Packets::Actions::InputMouseParamT *AsActions_InputMouseParam() const {
    return type == ActionParam::Actions_InputMouseParam ?
      reinterpret_cast<const Gamium::Protocol::Packets::Actions::InputMouseParamT *>(value) : nullptr;
  }
  Gamium::Protocol::Packets::Actions::InputSetTextParamT *AsActions_InputSetTextParam() {
    return type == ActionParam::Actions_InputSetTextParam ?
      reinterpret_cast<Gamium::Protocol::Packets::Actions::InputSetTextParamT *>(value) : nullptr;
  }
  const Gamium::Protocol::Packets::Actions::InputSetTextParamT *AsActions_InputSetTextParam() const {
    return type == ActionParam::Actions_InputSetTextParam ?
      reinterpret_cast<const Gamium::Protocol::Packets::Actions::InputSetTextParamT *>(value) : nullptr;
  }
  Gamium::Protocol::Packets::Actions::MovePlayerParamT *AsActions_MovePlayerParam() {
    return type == ActionParam::Actions_MovePlayerParam ?
      reinterpret_cast<Gamium::Protocol::Packets::Actions::MovePlayerParamT *>(value) : nullptr;
  }
  const Gamium::Protocol::Packets::Actions::MovePlayerParamT *AsActions_MovePlayerParam() const {
    return type == ActionParam::Actions_MovePlayerParam ?
      reinterpret_cast<const Gamium::Protocol::Packets::Actions::MovePlayerParamT *>(value) : nullptr;
  }
  Gamium::Protocol::Packets::Actions::AppQuitParamT *AsActions_AppQuitParam() {
    return type == ActionParam::Actions_AppQuitParam ?
      reinterpret_cast<Gamium::Protocol::Packets::Actions::AppQuitParamT *>(value) : nullptr;
  }
  const Gamium::Protocol::Packets::Actions::AppQuitParamT *AsActions_AppQuitParam() const {
    return type == ActionParam::Actions_AppQuitParam ?
      reinterpret_cast<const Gamium::Protocol::Packets::Actions::AppQuitParamT *>(value) : nullptr;
  }
};

bool VerifyActionParam(flatbuffers::Verifier &verifier, const void *obj, ActionParam type);
bool VerifyActionParamVector(flatbuffers::Verifier &verifier, const flatbuffers::Vector<flatbuffers::Offset<void>> *values, const flatbuffers::Vector<ActionParam> *types);

struct ActionParamSingleT : public flatbuffers::NativeTable {
  typedef ActionParamSingle TableType;
  Gamium::Protocol::Packets::ActionParamUnion action{};
};

struct ActionParamSingle FLATBUFFERS_FINAL_CLASS : private flatbuffers::Table {
  typedef ActionParamSingleT NativeTableType;
  typedef ActionParamSingleBuilder Builder;
  static const flatbuffers::TypeTable *MiniReflectTypeTable() {
    return ActionParamSingleTypeTable();
  }
  enum FlatBuffersVTableOffset FLATBUFFERS_VTABLE_UNDERLYING_TYPE {
    VT_ACTION_TYPE = 4,
    VT_ACTION = 6
  };
  Gamium::Protocol::Packets::ActionParam action_type() const {
    return static_cast<Gamium::Protocol::Packets::ActionParam>(GetField<uint8_t>(VT_ACTION_TYPE, 0));
  }
  const void *action() const {
    return GetPointer<const void *>(VT_ACTION);
  }
  template<typename T> const T *action_as() const;
  const Gamium::Protocol::Packets::Actions::SleepParam *action_as_Actions_SleepParam() const {
    return action_type() == Gamium::Protocol::Packets::ActionParam::Actions_SleepParam ? static_cast<const Gamium::Protocol::Packets::Actions::SleepParam *>(action()) : nullptr;
  }
  const Gamium::Protocol::Packets::Actions::InputKeyParam *action_as_Actions_InputKeyParam() const {
    return action_type() == Gamium::Protocol::Packets::ActionParam::Actions_InputKeyParam ? static_cast<const Gamium::Protocol::Packets::Actions::InputKeyParam *>(action()) : nullptr;
  }
  const Gamium::Protocol::Packets::Actions::InputMouseParam *action_as_Actions_InputMouseParam() const {
    return action_type() == Gamium::Protocol::Packets::ActionParam::Actions_InputMouseParam ? static_cast<const Gamium::Protocol::Packets::Actions::InputMouseParam *>(action()) : nullptr;
  }
  const Gamium::Protocol::Packets::Actions::InputSetTextParam *action_as_Actions_InputSetTextParam() const {
    return action_type() == Gamium::Protocol::Packets::ActionParam::Actions_InputSetTextParam ? static_cast<const Gamium::Protocol::Packets::Actions::InputSetTextParam *>(action()) : nullptr;
  }
  const Gamium::Protocol::Packets::Actions::MovePlayerParam *action_as_Actions_MovePlayerParam() const {
    return action_type() == Gamium::Protocol::Packets::ActionParam::Actions_MovePlayerParam ? static_cast<const Gamium::Protocol::Packets::Actions::MovePlayerParam *>(action()) : nullptr;
  }
  const Gamium::Protocol::Packets::Actions::AppQuitParam *action_as_Actions_AppQuitParam() const {
    return action_type() == Gamium::Protocol::Packets::ActionParam::Actions_AppQuitParam ? static_cast<const Gamium::Protocol::Packets::Actions::AppQuitParam *>(action()) : nullptr;
  }
  bool Verify(flatbuffers::Verifier &verifier) const {
    return VerifyTableStart(verifier) &&
           VerifyField<uint8_t>(verifier, VT_ACTION_TYPE, 1) &&
           VerifyOffset(verifier, VT_ACTION) &&
           VerifyActionParam(verifier, action(), action_type()) &&
           verifier.EndTable();
  }
  ActionParamSingleT *UnPack(const flatbuffers::resolver_function_t *_resolver = nullptr) const;
  void UnPackTo(ActionParamSingleT *_o, const flatbuffers::resolver_function_t *_resolver = nullptr) const;
  static flatbuffers::Offset<ActionParamSingle> Pack(flatbuffers::FlatBufferBuilder &_fbb, const ActionParamSingleT* _o, const flatbuffers::rehasher_function_t *_rehasher = nullptr);
};

template<> inline const Gamium::Protocol::Packets::Actions::SleepParam *ActionParamSingle::action_as<Gamium::Protocol::Packets::Actions::SleepParam>() const {
  return action_as_Actions_SleepParam();
}

template<> inline const Gamium::Protocol::Packets::Actions::InputKeyParam *ActionParamSingle::action_as<Gamium::Protocol::Packets::Actions::InputKeyParam>() const {
  return action_as_Actions_InputKeyParam();
}

template<> inline const Gamium::Protocol::Packets::Actions::InputMouseParam *ActionParamSingle::action_as<Gamium::Protocol::Packets::Actions::InputMouseParam>() const {
  return action_as_Actions_InputMouseParam();
}

template<> inline const Gamium::Protocol::Packets::Actions::InputSetTextParam *ActionParamSingle::action_as<Gamium::Protocol::Packets::Actions::InputSetTextParam>() const {
  return action_as_Actions_InputSetTextParam();
}

template<> inline const Gamium::Protocol::Packets::Actions::MovePlayerParam *ActionParamSingle::action_as<Gamium::Protocol::Packets::Actions::MovePlayerParam>() const {
  return action_as_Actions_MovePlayerParam();
}

template<> inline const Gamium::Protocol::Packets::Actions::AppQuitParam *ActionParamSingle::action_as<Gamium::Protocol::Packets::Actions::AppQuitParam>() const {
  return action_as_Actions_AppQuitParam();
}

struct ActionParamSingleBuilder {
  typedef ActionParamSingle Table;
  flatbuffers::FlatBufferBuilder &fbb_;
  flatbuffers::uoffset_t start_;
  void add_action_type(Gamium::Protocol::Packets::ActionParam action_type) {
    fbb_.AddElement<uint8_t>(ActionParamSingle::VT_ACTION_TYPE, static_cast<uint8_t>(action_type), 0);
  }
  void add_action(flatbuffers::Offset<void> action) {
    fbb_.AddOffset(ActionParamSingle::VT_ACTION, action);
  }
  explicit ActionParamSingleBuilder(flatbuffers::FlatBufferBuilder &_fbb)
        : fbb_(_fbb) {
    start_ = fbb_.StartTable();
  }
  flatbuffers::Offset<ActionParamSingle> Finish() {
    const auto end = fbb_.EndTable(start_);
    auto o = flatbuffers::Offset<ActionParamSingle>(end);
    return o;
  }
};

inline flatbuffers::Offset<ActionParamSingle> CreateActionParamSingle(
    flatbuffers::FlatBufferBuilder &_fbb,
    Gamium::Protocol::Packets::ActionParam action_type = Gamium::Protocol::Packets::ActionParam::NONE,
    flatbuffers::Offset<void> action = 0) {
  ActionParamSingleBuilder builder_(_fbb);
  builder_.add_action(action);
  builder_.add_action_type(action_type);
  return builder_.Finish();
}

flatbuffers::Offset<ActionParamSingle> CreateActionParamSingle(flatbuffers::FlatBufferBuilder &_fbb, const ActionParamSingleT *_o, const flatbuffers::rehasher_function_t *_rehasher = nullptr);

struct ActionResultT : public flatbuffers::NativeTable {
  typedef ActionResult TableType;
  std::unique_ptr<Gamium::Protocol::Types::ErrorResultT> error{};
  ActionResultT() = default;
  ActionResultT(const ActionResultT &o);
  ActionResultT(ActionResultT&&) FLATBUFFERS_NOEXCEPT = default;
  ActionResultT &operator=(ActionResultT o) FLATBUFFERS_NOEXCEPT;
};

struct ActionResult FLATBUFFERS_FINAL_CLASS : private flatbuffers::Table {
  typedef ActionResultT NativeTableType;
  typedef ActionResultBuilder Builder;
  static const flatbuffers::TypeTable *MiniReflectTypeTable() {
    return ActionResultTypeTable();
  }
  enum FlatBuffersVTableOffset FLATBUFFERS_VTABLE_UNDERLYING_TYPE {
    VT_ERROR = 4
  };
  const Gamium::Protocol::Types::ErrorResult *error() const {
    return GetPointer<const Gamium::Protocol::Types::ErrorResult *>(VT_ERROR);
  }
  bool Verify(flatbuffers::Verifier &verifier) const {
    return VerifyTableStart(verifier) &&
           VerifyOffset(verifier, VT_ERROR) &&
           verifier.VerifyTable(error()) &&
           verifier.EndTable();
  }
  ActionResultT *UnPack(const flatbuffers::resolver_function_t *_resolver = nullptr) const;
  void UnPackTo(ActionResultT *_o, const flatbuffers::resolver_function_t *_resolver = nullptr) const;
  static flatbuffers::Offset<ActionResult> Pack(flatbuffers::FlatBufferBuilder &_fbb, const ActionResultT* _o, const flatbuffers::rehasher_function_t *_rehasher = nullptr);
};

struct ActionResultBuilder {
  typedef ActionResult Table;
  flatbuffers::FlatBufferBuilder &fbb_;
  flatbuffers::uoffset_t start_;
  void add_error(flatbuffers::Offset<Gamium::Protocol::Types::ErrorResult> error) {
    fbb_.AddOffset(ActionResult::VT_ERROR, error);
  }
  explicit ActionResultBuilder(flatbuffers::FlatBufferBuilder &_fbb)
        : fbb_(_fbb) {
    start_ = fbb_.StartTable();
  }
  flatbuffers::Offset<ActionResult> Finish() {
    const auto end = fbb_.EndTable(start_);
    auto o = flatbuffers::Offset<ActionResult>(end);
    return o;
  }
};

inline flatbuffers::Offset<ActionResult> CreateActionResult(
    flatbuffers::FlatBufferBuilder &_fbb,
    flatbuffers::Offset<Gamium::Protocol::Types::ErrorResult> error = 0) {
  ActionResultBuilder builder_(_fbb);
  builder_.add_error(error);
  return builder_.Finish();
}

flatbuffers::Offset<ActionResult> CreateActionResult(flatbuffers::FlatBufferBuilder &_fbb, const ActionResultT *_o, const flatbuffers::rehasher_function_t *_rehasher = nullptr);

struct ActionsParamT : public flatbuffers::NativeTable {
  typedef ActionsParam TableType;
  std::vector<std::string> actions{};
};

struct ActionsParam FLATBUFFERS_FINAL_CLASS : private flatbuffers::Table {
  typedef ActionsParamT NativeTableType;
  typedef ActionsParamBuilder Builder;
  static const flatbuffers::TypeTable *MiniReflectTypeTable() {
    return ActionsParamTypeTable();
  }
  enum FlatBuffersVTableOffset FLATBUFFERS_VTABLE_UNDERLYING_TYPE {
    VT_ACTIONS = 4
  };
  const flatbuffers::Vector<flatbuffers::Offset<flatbuffers::String>> *actions() const {
    return GetPointer<const flatbuffers::Vector<flatbuffers::Offset<flatbuffers::String>> *>(VT_ACTIONS);
  }
  bool Verify(flatbuffers::Verifier &verifier) const {
    return VerifyTableStart(verifier) &&
           VerifyOffset(verifier, VT_ACTIONS) &&
           verifier.VerifyVector(actions()) &&
           verifier.VerifyVectorOfStrings(actions()) &&
           verifier.EndTable();
  }
  ActionsParamT *UnPack(const flatbuffers::resolver_function_t *_resolver = nullptr) const;
  void UnPackTo(ActionsParamT *_o, const flatbuffers::resolver_function_t *_resolver = nullptr) const;
  static flatbuffers::Offset<ActionsParam> Pack(flatbuffers::FlatBufferBuilder &_fbb, const ActionsParamT* _o, const flatbuffers::rehasher_function_t *_rehasher = nullptr);
};

struct ActionsParamBuilder {
  typedef ActionsParam Table;
  flatbuffers::FlatBufferBuilder &fbb_;
  flatbuffers::uoffset_t start_;
  void add_actions(flatbuffers::Offset<flatbuffers::Vector<flatbuffers::Offset<flatbuffers::String>>> actions) {
    fbb_.AddOffset(ActionsParam::VT_ACTIONS, actions);
  }
  explicit ActionsParamBuilder(flatbuffers::FlatBufferBuilder &_fbb)
        : fbb_(_fbb) {
    start_ = fbb_.StartTable();
  }
  flatbuffers::Offset<ActionsParam> Finish() {
    const auto end = fbb_.EndTable(start_);
    auto o = flatbuffers::Offset<ActionsParam>(end);
    return o;
  }
};

inline flatbuffers::Offset<ActionsParam> CreateActionsParam(
    flatbuffers::FlatBufferBuilder &_fbb,
    flatbuffers::Offset<flatbuffers::Vector<flatbuffers::Offset<flatbuffers::String>>> actions = 0) {
  ActionsParamBuilder builder_(_fbb);
  builder_.add_actions(actions);
  return builder_.Finish();
}

flatbuffers::Offset<ActionsParam> CreateActionsParam(flatbuffers::FlatBufferBuilder &_fbb, const ActionsParamT *_o, const flatbuffers::rehasher_function_t *_rehasher = nullptr);

struct ActionsResultT : public flatbuffers::NativeTable {
  typedef ActionsResult TableType;
  std::vector<Gamium::Protocol::Packets::ActionResultT> results{};
};

struct ActionsResult FLATBUFFERS_FINAL_CLASS : private flatbuffers::Table {
  typedef ActionsResultT NativeTableType;
  typedef ActionsResultBuilder Builder;
  static const flatbuffers::TypeTable *MiniReflectTypeTable() {
    return ActionsResultTypeTable();
  }
  enum FlatBuffersVTableOffset FLATBUFFERS_VTABLE_UNDERLYING_TYPE {
    VT_RESULTS = 4
  };
  const flatbuffers::Vector<flatbuffers::Offset<Gamium::Protocol::Packets::ActionResult>> *results() const {
    return GetPointer<const flatbuffers::Vector<flatbuffers::Offset<Gamium::Protocol::Packets::ActionResult>> *>(VT_RESULTS);
  }
  bool Verify(flatbuffers::Verifier &verifier) const {
    return VerifyTableStart(verifier) &&
           VerifyOffset(verifier, VT_RESULTS) &&
           verifier.VerifyVector(results()) &&
           verifier.VerifyVectorOfTables(results()) &&
           verifier.EndTable();
  }
  ActionsResultT *UnPack(const flatbuffers::resolver_function_t *_resolver = nullptr) const;
  void UnPackTo(ActionsResultT *_o, const flatbuffers::resolver_function_t *_resolver = nullptr) const;
  static flatbuffers::Offset<ActionsResult> Pack(flatbuffers::FlatBufferBuilder &_fbb, const ActionsResultT* _o, const flatbuffers::rehasher_function_t *_rehasher = nullptr);
};

struct ActionsResultBuilder {
  typedef ActionsResult Table;
  flatbuffers::FlatBufferBuilder &fbb_;
  flatbuffers::uoffset_t start_;
  void add_results(flatbuffers::Offset<flatbuffers::Vector<flatbuffers::Offset<Gamium::Protocol::Packets::ActionResult>>> results) {
    fbb_.AddOffset(ActionsResult::VT_RESULTS, results);
  }
  explicit ActionsResultBuilder(flatbuffers::FlatBufferBuilder &_fbb)
        : fbb_(_fbb) {
    start_ = fbb_.StartTable();
  }
  flatbuffers::Offset<ActionsResult> Finish() {
    const auto end = fbb_.EndTable(start_);
    auto o = flatbuffers::Offset<ActionsResult>(end);
    return o;
  }
};

inline flatbuffers::Offset<ActionsResult> CreateActionsResult(
    flatbuffers::FlatBufferBuilder &_fbb,
    flatbuffers::Offset<flatbuffers::Vector<flatbuffers::Offset<Gamium::Protocol::Packets::ActionResult>>> results = 0) {
  ActionsResultBuilder builder_(_fbb);
  builder_.add_results(results);
  return builder_.Finish();
}

flatbuffers::Offset<ActionsResult> CreateActionsResult(flatbuffers::FlatBufferBuilder &_fbb, const ActionsResultT *_o, const flatbuffers::rehasher_function_t *_rehasher = nullptr);

inline ActionParamSingleT *ActionParamSingle::UnPack(const flatbuffers::resolver_function_t *_resolver) const {
  auto _o = std::unique_ptr<ActionParamSingleT>(new ActionParamSingleT());
  UnPackTo(_o.get(), _resolver);
  return _o.release();
}

inline void ActionParamSingle::UnPackTo(ActionParamSingleT *_o, const flatbuffers::resolver_function_t *_resolver) const {
  (void)_o;
  (void)_resolver;
  { auto _e = action_type(); _o->action.type = _e; }
  { auto _e = action(); if (_e) _o->action.value = Gamium::Protocol::Packets::ActionParamUnion::UnPack(_e, action_type(), _resolver); }
}

inline flatbuffers::Offset<ActionParamSingle> ActionParamSingle::Pack(flatbuffers::FlatBufferBuilder &_fbb, const ActionParamSingleT* _o, const flatbuffers::rehasher_function_t *_rehasher) {
  return CreateActionParamSingle(_fbb, _o, _rehasher);
}

inline flatbuffers::Offset<ActionParamSingle> CreateActionParamSingle(flatbuffers::FlatBufferBuilder &_fbb, const ActionParamSingleT *_o, const flatbuffers::rehasher_function_t *_rehasher) {
  (void)_rehasher;
  (void)_o;
  struct _VectorArgs { flatbuffers::FlatBufferBuilder *__fbb; const ActionParamSingleT* __o; const flatbuffers::rehasher_function_t *__rehasher; } _va = { &_fbb, _o, _rehasher}; (void)_va;
  auto _action_type = _o->action.type;
  auto _action = _o->action.Pack(_fbb);
  return Gamium::Protocol::Packets::CreateActionParamSingle(
      _fbb,
      _action_type,
      _action);
}

inline ActionResultT::ActionResultT(const ActionResultT &o)
      : error((o.error) ? new Gamium::Protocol::Types::ErrorResultT(*o.error) : nullptr) {
}

inline ActionResultT &ActionResultT::operator=(ActionResultT o) FLATBUFFERS_NOEXCEPT {
  std::swap(error, o.error);
  return *this;
}

inline ActionResultT *ActionResult::UnPack(const flatbuffers::resolver_function_t *_resolver) const {
  auto _o = std::unique_ptr<ActionResultT>(new ActionResultT());
  UnPackTo(_o.get(), _resolver);
  return _o.release();
}

inline void ActionResult::UnPackTo(ActionResultT *_o, const flatbuffers::resolver_function_t *_resolver) const {
  (void)_o;
  (void)_resolver;
  { auto _e = error(); if (_e) { if(_o->error) { _e->UnPackTo(_o->error.get(), _resolver); } else { _o->error = std::unique_ptr<Gamium::Protocol::Types::ErrorResultT>(_e->UnPack(_resolver)); } } else if (_o->error) { _o->error.reset(); } }
}

inline flatbuffers::Offset<ActionResult> ActionResult::Pack(flatbuffers::FlatBufferBuilder &_fbb, const ActionResultT* _o, const flatbuffers::rehasher_function_t *_rehasher) {
  return CreateActionResult(_fbb, _o, _rehasher);
}

inline flatbuffers::Offset<ActionResult> CreateActionResult(flatbuffers::FlatBufferBuilder &_fbb, const ActionResultT *_o, const flatbuffers::rehasher_function_t *_rehasher) {
  (void)_rehasher;
  (void)_o;
  struct _VectorArgs { flatbuffers::FlatBufferBuilder *__fbb; const ActionResultT* __o; const flatbuffers::rehasher_function_t *__rehasher; } _va = { &_fbb, _o, _rehasher}; (void)_va;
  auto _error = _o->error ? CreateErrorResult(_fbb, _o->error.get(), _rehasher) : 0;
  return Gamium::Protocol::Packets::CreateActionResult(
      _fbb,
      _error);
}

inline ActionsParamT *ActionsParam::UnPack(const flatbuffers::resolver_function_t *_resolver) const {
  auto _o = std::unique_ptr<ActionsParamT>(new ActionsParamT());
  UnPackTo(_o.get(), _resolver);
  return _o.release();
}

inline void ActionsParam::UnPackTo(ActionsParamT *_o, const flatbuffers::resolver_function_t *_resolver) const {
  (void)_o;
  (void)_resolver;
  { auto _e = actions(); if (_e) { _o->actions.resize(_e->size()); for (flatbuffers::uoffset_t _i = 0; _i < _e->size(); _i++) { _o->actions[_i] = _e->Get(_i)->str(); } } else { _o->actions.resize(0); } }
}

inline flatbuffers::Offset<ActionsParam> ActionsParam::Pack(flatbuffers::FlatBufferBuilder &_fbb, const ActionsParamT* _o, const flatbuffers::rehasher_function_t *_rehasher) {
  return CreateActionsParam(_fbb, _o, _rehasher);
}

inline flatbuffers::Offset<ActionsParam> CreateActionsParam(flatbuffers::FlatBufferBuilder &_fbb, const ActionsParamT *_o, const flatbuffers::rehasher_function_t *_rehasher) {
  (void)_rehasher;
  (void)_o;
  struct _VectorArgs { flatbuffers::FlatBufferBuilder *__fbb; const ActionsParamT* __o; const flatbuffers::rehasher_function_t *__rehasher; } _va = { &_fbb, _o, _rehasher}; (void)_va;
  auto _actions = _fbb.CreateVectorOfStrings(_o->actions);
  return Gamium::Protocol::Packets::CreateActionsParam(
      _fbb,
      _actions);
}

inline ActionsResultT *ActionsResult::UnPack(const flatbuffers::resolver_function_t *_resolver) const {
  auto _o = std::unique_ptr<ActionsResultT>(new ActionsResultT());
  UnPackTo(_o.get(), _resolver);
  return _o.release();
}

inline void ActionsResult::UnPackTo(ActionsResultT *_o, const flatbuffers::resolver_function_t *_resolver) const {
  (void)_o;
  (void)_resolver;
  { auto _e = results(); if (_e) { _o->results.resize(_e->size()); for (flatbuffers::uoffset_t _i = 0; _i < _e->size(); _i++) { _o->results[_i] = *std::unique_ptr<Gamium::Protocol::Packets::ActionResultT>(_e->Get(_i)->UnPack(_resolver)); } } else { _o->results.resize(0); } }
}

inline flatbuffers::Offset<ActionsResult> ActionsResult::Pack(flatbuffers::FlatBufferBuilder &_fbb, const ActionsResultT* _o, const flatbuffers::rehasher_function_t *_rehasher) {
  return CreateActionsResult(_fbb, _o, _rehasher);
}

inline flatbuffers::Offset<ActionsResult> CreateActionsResult(flatbuffers::FlatBufferBuilder &_fbb, const ActionsResultT *_o, const flatbuffers::rehasher_function_t *_rehasher) {
  (void)_rehasher;
  (void)_o;
  struct _VectorArgs { flatbuffers::FlatBufferBuilder *__fbb; const ActionsResultT* __o; const flatbuffers::rehasher_function_t *__rehasher; } _va = { &_fbb, _o, _rehasher}; (void)_va;
  auto _results = _fbb.CreateVector<flatbuffers::Offset<Gamium::Protocol::Packets::ActionResult>> (_o->results.size(), [](size_t i, _VectorArgs *__va) { return CreateActionResult(*__va->__fbb, &(__va->__o->results[i]), __va->__rehasher); }, &_va );
  return Gamium::Protocol::Packets::CreateActionsResult(
      _fbb,
      _results);
}

inline bool VerifyActionParam(flatbuffers::Verifier &verifier, const void *obj, ActionParam type) {
  switch (type) {
    case ActionParam::NONE: {
      return true;
    }
    case ActionParam::Actions_SleepParam: {
      auto ptr = reinterpret_cast<const Gamium::Protocol::Packets::Actions::SleepParam *>(obj);
      return verifier.VerifyTable(ptr);
    }
    case ActionParam::Actions_InputKeyParam: {
      auto ptr = reinterpret_cast<const Gamium::Protocol::Packets::Actions::InputKeyParam *>(obj);
      return verifier.VerifyTable(ptr);
    }
    case ActionParam::Actions_InputMouseParam: {
      auto ptr = reinterpret_cast<const Gamium::Protocol::Packets::Actions::InputMouseParam *>(obj);
      return verifier.VerifyTable(ptr);
    }
    case ActionParam::Actions_InputSetTextParam: {
      auto ptr = reinterpret_cast<const Gamium::Protocol::Packets::Actions::InputSetTextParam *>(obj);
      return verifier.VerifyTable(ptr);
    }
    case ActionParam::Actions_MovePlayerParam: {
      auto ptr = reinterpret_cast<const Gamium::Protocol::Packets::Actions::MovePlayerParam *>(obj);
      return verifier.VerifyTable(ptr);
    }
    case ActionParam::Actions_AppQuitParam: {
      auto ptr = reinterpret_cast<const Gamium::Protocol::Packets::Actions::AppQuitParam *>(obj);
      return verifier.VerifyTable(ptr);
    }
    default: return true;
  }
}

inline bool VerifyActionParamVector(flatbuffers::Verifier &verifier, const flatbuffers::Vector<flatbuffers::Offset<void>> *values, const flatbuffers::Vector<ActionParam> *types) {
  if (!values || !types) return !values && !types;
  if (values->size() != types->size()) return false;
  for (flatbuffers::uoffset_t i = 0; i < values->size(); ++i) {
    if (!VerifyActionParam(
        verifier,  values->Get(i), types->GetEnum<ActionParam>(i))) {
      return false;
    }
  }
  return true;
}

inline void *ActionParamUnion::UnPack(const void *obj, ActionParam type, const flatbuffers::resolver_function_t *resolver) {
  (void)resolver;
  switch (type) {
    case ActionParam::Actions_SleepParam: {
      auto ptr = reinterpret_cast<const Gamium::Protocol::Packets::Actions::SleepParam *>(obj);
      return ptr->UnPack(resolver);
    }
    case ActionParam::Actions_InputKeyParam: {
      auto ptr = reinterpret_cast<const Gamium::Protocol::Packets::Actions::InputKeyParam *>(obj);
      return ptr->UnPack(resolver);
    }
    case ActionParam::Actions_InputMouseParam: {
      auto ptr = reinterpret_cast<const Gamium::Protocol::Packets::Actions::InputMouseParam *>(obj);
      return ptr->UnPack(resolver);
    }
    case ActionParam::Actions_InputSetTextParam: {
      auto ptr = reinterpret_cast<const Gamium::Protocol::Packets::Actions::InputSetTextParam *>(obj);
      return ptr->UnPack(resolver);
    }
    case ActionParam::Actions_MovePlayerParam: {
      auto ptr = reinterpret_cast<const Gamium::Protocol::Packets::Actions::MovePlayerParam *>(obj);
      return ptr->UnPack(resolver);
    }
    case ActionParam::Actions_AppQuitParam: {
      auto ptr = reinterpret_cast<const Gamium::Protocol::Packets::Actions::AppQuitParam *>(obj);
      return ptr->UnPack(resolver);
    }
    default: return nullptr;
  }
}

inline flatbuffers::Offset<void> ActionParamUnion::Pack(flatbuffers::FlatBufferBuilder &_fbb, const flatbuffers::rehasher_function_t *_rehasher) const {
  (void)_rehasher;
  switch (type) {
    case ActionParam::Actions_SleepParam: {
      auto ptr = reinterpret_cast<const Gamium::Protocol::Packets::Actions::SleepParamT *>(value);
      return CreateSleepParam(_fbb, ptr, _rehasher).Union();
    }
    case ActionParam::Actions_InputKeyParam: {
      auto ptr = reinterpret_cast<const Gamium::Protocol::Packets::Actions::InputKeyParamT *>(value);
      return CreateInputKeyParam(_fbb, ptr, _rehasher).Union();
    }
    case ActionParam::Actions_InputMouseParam: {
      auto ptr = reinterpret_cast<const Gamium::Protocol::Packets::Actions::InputMouseParamT *>(value);
      return CreateInputMouseParam(_fbb, ptr, _rehasher).Union();
    }
    case ActionParam::Actions_InputSetTextParam: {
      auto ptr = reinterpret_cast<const Gamium::Protocol::Packets::Actions::InputSetTextParamT *>(value);
      return CreateInputSetTextParam(_fbb, ptr, _rehasher).Union();
    }
    case ActionParam::Actions_MovePlayerParam: {
      auto ptr = reinterpret_cast<const Gamium::Protocol::Packets::Actions::MovePlayerParamT *>(value);
      return CreateMovePlayerParam(_fbb, ptr, _rehasher).Union();
    }
    case ActionParam::Actions_AppQuitParam: {
      auto ptr = reinterpret_cast<const Gamium::Protocol::Packets::Actions::AppQuitParamT *>(value);
      return CreateAppQuitParam(_fbb, ptr, _rehasher).Union();
    }
    default: return 0;
  }
}

inline ActionParamUnion::ActionParamUnion(const ActionParamUnion &u) : type(u.type), value(nullptr) {
  switch (type) {
    case ActionParam::Actions_SleepParam: {
      value = new Gamium::Protocol::Packets::Actions::SleepParamT(*reinterpret_cast<Gamium::Protocol::Packets::Actions::SleepParamT *>(u.value));
      break;
    }
    case ActionParam::Actions_InputKeyParam: {
      value = new Gamium::Protocol::Packets::Actions::InputKeyParamT(*reinterpret_cast<Gamium::Protocol::Packets::Actions::InputKeyParamT *>(u.value));
      break;
    }
    case ActionParam::Actions_InputMouseParam: {
      value = new Gamium::Protocol::Packets::Actions::InputMouseParamT(*reinterpret_cast<Gamium::Protocol::Packets::Actions::InputMouseParamT *>(u.value));
      break;
    }
    case ActionParam::Actions_InputSetTextParam: {
      value = new Gamium::Protocol::Packets::Actions::InputSetTextParamT(*reinterpret_cast<Gamium::Protocol::Packets::Actions::InputSetTextParamT *>(u.value));
      break;
    }
    case ActionParam::Actions_MovePlayerParam: {
      value = new Gamium::Protocol::Packets::Actions::MovePlayerParamT(*reinterpret_cast<Gamium::Protocol::Packets::Actions::MovePlayerParamT *>(u.value));
      break;
    }
    case ActionParam::Actions_AppQuitParam: {
      value = new Gamium::Protocol::Packets::Actions::AppQuitParamT(*reinterpret_cast<Gamium::Protocol::Packets::Actions::AppQuitParamT *>(u.value));
      break;
    }
    default:
      break;
  }
}

inline void ActionParamUnion::Reset() {
  switch (type) {
    case ActionParam::Actions_SleepParam: {
      auto ptr = reinterpret_cast<Gamium::Protocol::Packets::Actions::SleepParamT *>(value);
      delete ptr;
      break;
    }
    case ActionParam::Actions_InputKeyParam: {
      auto ptr = reinterpret_cast<Gamium::Protocol::Packets::Actions::InputKeyParamT *>(value);
      delete ptr;
      break;
    }
    case ActionParam::Actions_InputMouseParam: {
      auto ptr = reinterpret_cast<Gamium::Protocol::Packets::Actions::InputMouseParamT *>(value);
      delete ptr;
      break;
    }
    case ActionParam::Actions_InputSetTextParam: {
      auto ptr = reinterpret_cast<Gamium::Protocol::Packets::Actions::InputSetTextParamT *>(value);
      delete ptr;
      break;
    }
    case ActionParam::Actions_MovePlayerParam: {
      auto ptr = reinterpret_cast<Gamium::Protocol::Packets::Actions::MovePlayerParamT *>(value);
      delete ptr;
      break;
    }
    case ActionParam::Actions_AppQuitParam: {
      auto ptr = reinterpret_cast<Gamium::Protocol::Packets::Actions::AppQuitParamT *>(value);
      delete ptr;
      break;
    }
    default: break;
  }
  value = nullptr;
  type = ActionParam::NONE;
}

inline const flatbuffers::TypeTable *ActionParamTypeTable() {
  static const flatbuffers::TypeCode type_codes[] = {
    { flatbuffers::ET_SEQUENCE, 0, -1 },
    { flatbuffers::ET_SEQUENCE, 0, 0 },
    { flatbuffers::ET_SEQUENCE, 0, 1 },
    { flatbuffers::ET_SEQUENCE, 0, 2 },
    { flatbuffers::ET_SEQUENCE, 0, 3 },
    { flatbuffers::ET_SEQUENCE, 0, 4 },
    { flatbuffers::ET_SEQUENCE, 0, 5 }
  };
  static const flatbuffers::TypeFunction type_refs[] = {
    Gamium::Protocol::Packets::Actions::SleepParamTypeTable,
    Gamium::Protocol::Packets::Actions::InputKeyParamTypeTable,
    Gamium::Protocol::Packets::Actions::InputMouseParamTypeTable,
    Gamium::Protocol::Packets::Actions::InputSetTextParamTypeTable,
    Gamium::Protocol::Packets::Actions::MovePlayerParamTypeTable,
    Gamium::Protocol::Packets::Actions::AppQuitParamTypeTable
  };
  static const flatbuffers::TypeTable tt = {
    flatbuffers::ST_UNION, 7, type_codes, type_refs, nullptr, nullptr, nullptr
  };
  return &tt;
}

inline const flatbuffers::TypeTable *ActionParamSingleTypeTable() {
  static const flatbuffers::TypeCode type_codes[] = {
    { flatbuffers::ET_UTYPE, 0, 0 },
    { flatbuffers::ET_SEQUENCE, 0, 0 }
  };
  static const flatbuffers::TypeFunction type_refs[] = {
    Gamium::Protocol::Packets::ActionParamTypeTable
  };
  static const flatbuffers::TypeTable tt = {
    flatbuffers::ST_TABLE, 2, type_codes, type_refs, nullptr, nullptr, nullptr
  };
  return &tt;
}

inline const flatbuffers::TypeTable *ActionResultTypeTable() {
  static const flatbuffers::TypeCode type_codes[] = {
    { flatbuffers::ET_SEQUENCE, 0, 0 }
  };
  static const flatbuffers::TypeFunction type_refs[] = {
    Gamium::Protocol::Types::ErrorResultTypeTable
  };
  static const flatbuffers::TypeTable tt = {
    flatbuffers::ST_TABLE, 1, type_codes, type_refs, nullptr, nullptr, nullptr
  };
  return &tt;
}

inline const flatbuffers::TypeTable *ActionsParamTypeTable() {
  static const flatbuffers::TypeCode type_codes[] = {
    { flatbuffers::ET_STRING, 1, -1 }
  };
  static const flatbuffers::TypeTable tt = {
    flatbuffers::ST_TABLE, 1, type_codes, nullptr, nullptr, nullptr, nullptr
  };
  return &tt;
}

inline const flatbuffers::TypeTable *ActionsResultTypeTable() {
  static const flatbuffers::TypeCode type_codes[] = {
    { flatbuffers::ET_SEQUENCE, 1, 0 }
  };
  static const flatbuffers::TypeFunction type_refs[] = {
    Gamium::Protocol::Packets::ActionResultTypeTable
  };
  static const flatbuffers::TypeTable tt = {
    flatbuffers::ST_TABLE, 1, type_codes, type_refs, nullptr, nullptr, nullptr
  };
  return &tt;
}

}  // namespace Packets
}  // namespace Protocol
}  // namespace Gamium

#endif  // FLATBUFFERS_GENERATED_ACTIONPACKET_GAMIUM_PROTOCOL_PACKETS_H_