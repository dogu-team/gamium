// automatically generated by the FlatBuffers compiler, do not modify


#ifndef FLATBUFFERS_GENERATED_REQUEST_GAMIUM_PROTOCOL_H_
#define FLATBUFFERS_GENERATED_REQUEST_GAMIUM_PROTOCOL_H_

#include "flatbuffers/flatbuffers.h"

// Ensure the included flatbuffers.h is the same version as when this file was
// generated, otherwise it may not be compatible.
static_assert(FLATBUFFERS_VERSION_MAJOR == 22 &&
              FLATBUFFERS_VERSION_MINOR == 10 &&
              FLATBUFFERS_VERSION_REVISION == 26,
             "Non-compatible flatbuffers version included");

#include "action_packet_generated.h"
#include "config_packet_generated.h"
#include "execute_packet_generated.h"
#include "health_packet_generated.h"
#include "inspector_packet_generated.h"
#include "object_packet_generated.h"
#include "profile_packet_generated.h"
#include "screen_packet_generated.h"

namespace Gamium {
namespace Protocol {

struct Request;
struct RequestBuilder;
struct RequestT;

inline const flatbuffers::TypeTable *RequestTypeTable();

enum class Param : uint8_t {
  NONE = 0,
  Packets_HelloParam = 1,
  Packets_QueryScreenParam = 2,
  Packets_FindObjectsParam = 3,
  Packets_QueryObjectInteractableParam = 4,
  Packets_ActionsParam = 5,
  Packets_ExecuteRpcParam = 6,
  Packets_InspectObjectOnScreenParam = 7,
  Packets_InspectObjectWithIdParam = 8,
  Packets_DumpObjectsHierarchyParam = 9,
  Packets_ChangeConfigurationParam = 10,
  Packets_QueryProfileParam = 11,
  MIN = NONE,
  MAX = Packets_QueryProfileParam
};

inline const Param (&EnumValuesParam())[12] {
  static const Param values[] = {
    Param::NONE,
    Param::Packets_HelloParam,
    Param::Packets_QueryScreenParam,
    Param::Packets_FindObjectsParam,
    Param::Packets_QueryObjectInteractableParam,
    Param::Packets_ActionsParam,
    Param::Packets_ExecuteRpcParam,
    Param::Packets_InspectObjectOnScreenParam,
    Param::Packets_InspectObjectWithIdParam,
    Param::Packets_DumpObjectsHierarchyParam,
    Param::Packets_ChangeConfigurationParam,
    Param::Packets_QueryProfileParam
  };
  return values;
}

inline const char * const *EnumNamesParam() {
  static const char * const names[13] = {
    "NONE",
    "Packets_HelloParam",
    "Packets_QueryScreenParam",
    "Packets_FindObjectsParam",
    "Packets_QueryObjectInteractableParam",
    "Packets_ActionsParam",
    "Packets_ExecuteRpcParam",
    "Packets_InspectObjectOnScreenParam",
    "Packets_InspectObjectWithIdParam",
    "Packets_DumpObjectsHierarchyParam",
    "Packets_ChangeConfigurationParam",
    "Packets_QueryProfileParam",
    nullptr
  };
  return names;
}

inline const char *EnumNameParam(Param e) {
  if (flatbuffers::IsOutRange(e, Param::NONE, Param::Packets_QueryProfileParam)) return "";
  const size_t index = static_cast<size_t>(e);
  return EnumNamesParam()[index];
}

template<typename T> struct ParamTraits {
  static const Param enum_value = Param::NONE;
};

template<> struct ParamTraits<Gamium::Protocol::Packets::HelloParam> {
  static const Param enum_value = Param::Packets_HelloParam;
};

template<> struct ParamTraits<Gamium::Protocol::Packets::QueryScreenParam> {
  static const Param enum_value = Param::Packets_QueryScreenParam;
};

template<> struct ParamTraits<Gamium::Protocol::Packets::FindObjectsParam> {
  static const Param enum_value = Param::Packets_FindObjectsParam;
};

template<> struct ParamTraits<Gamium::Protocol::Packets::QueryObjectInteractableParam> {
  static const Param enum_value = Param::Packets_QueryObjectInteractableParam;
};

template<> struct ParamTraits<Gamium::Protocol::Packets::ActionsParam> {
  static const Param enum_value = Param::Packets_ActionsParam;
};

template<> struct ParamTraits<Gamium::Protocol::Packets::ExecuteRpcParam> {
  static const Param enum_value = Param::Packets_ExecuteRpcParam;
};

template<> struct ParamTraits<Gamium::Protocol::Packets::InspectObjectOnScreenParam> {
  static const Param enum_value = Param::Packets_InspectObjectOnScreenParam;
};

template<> struct ParamTraits<Gamium::Protocol::Packets::InspectObjectWithIdParam> {
  static const Param enum_value = Param::Packets_InspectObjectWithIdParam;
};

template<> struct ParamTraits<Gamium::Protocol::Packets::DumpObjectsHierarchyParam> {
  static const Param enum_value = Param::Packets_DumpObjectsHierarchyParam;
};

template<> struct ParamTraits<Gamium::Protocol::Packets::ChangeConfigurationParam> {
  static const Param enum_value = Param::Packets_ChangeConfigurationParam;
};

template<> struct ParamTraits<Gamium::Protocol::Packets::QueryProfileParam> {
  static const Param enum_value = Param::Packets_QueryProfileParam;
};

template<typename T> struct ParamUnionTraits {
  static const Param enum_value = Param::NONE;
};

template<> struct ParamUnionTraits<Gamium::Protocol::Packets::HelloParamT> {
  static const Param enum_value = Param::Packets_HelloParam;
};

template<> struct ParamUnionTraits<Gamium::Protocol::Packets::QueryScreenParamT> {
  static const Param enum_value = Param::Packets_QueryScreenParam;
};

template<> struct ParamUnionTraits<Gamium::Protocol::Packets::FindObjectsParamT> {
  static const Param enum_value = Param::Packets_FindObjectsParam;
};

template<> struct ParamUnionTraits<Gamium::Protocol::Packets::QueryObjectInteractableParamT> {
  static const Param enum_value = Param::Packets_QueryObjectInteractableParam;
};

template<> struct ParamUnionTraits<Gamium::Protocol::Packets::ActionsParamT> {
  static const Param enum_value = Param::Packets_ActionsParam;
};

template<> struct ParamUnionTraits<Gamium::Protocol::Packets::ExecuteRpcParamT> {
  static const Param enum_value = Param::Packets_ExecuteRpcParam;
};

template<> struct ParamUnionTraits<Gamium::Protocol::Packets::InspectObjectOnScreenParamT> {
  static const Param enum_value = Param::Packets_InspectObjectOnScreenParam;
};

template<> struct ParamUnionTraits<Gamium::Protocol::Packets::InspectObjectWithIdParamT> {
  static const Param enum_value = Param::Packets_InspectObjectWithIdParam;
};

template<> struct ParamUnionTraits<Gamium::Protocol::Packets::DumpObjectsHierarchyParamT> {
  static const Param enum_value = Param::Packets_DumpObjectsHierarchyParam;
};

template<> struct ParamUnionTraits<Gamium::Protocol::Packets::ChangeConfigurationParamT> {
  static const Param enum_value = Param::Packets_ChangeConfigurationParam;
};

template<> struct ParamUnionTraits<Gamium::Protocol::Packets::QueryProfileParamT> {
  static const Param enum_value = Param::Packets_QueryProfileParam;
};

struct ParamUnion {
  Param type;
  void *value;

  ParamUnion() : type(Param::NONE), value(nullptr) {}
  ParamUnion(ParamUnion&& u) FLATBUFFERS_NOEXCEPT :
    type(Param::NONE), value(nullptr)
    { std::swap(type, u.type); std::swap(value, u.value); }
  ParamUnion(const ParamUnion &);
  ParamUnion &operator=(const ParamUnion &u)
    { ParamUnion t(u); std::swap(type, t.type); std::swap(value, t.value); return *this; }
  ParamUnion &operator=(ParamUnion &&u) FLATBUFFERS_NOEXCEPT
    { std::swap(type, u.type); std::swap(value, u.value); return *this; }
  ~ParamUnion() { Reset(); }

  void Reset();

  template <typename T>
  void Set(T&& val) {
    typedef typename std::remove_reference<T>::type RT;
    Reset();
    type = ParamUnionTraits<RT>::enum_value;
    if (type != Param::NONE) {
      value = new RT(std::forward<T>(val));
    }
  }

  static void *UnPack(const void *obj, Param type, const flatbuffers::resolver_function_t *resolver);
  flatbuffers::Offset<void> Pack(flatbuffers::FlatBufferBuilder &_fbb, const flatbuffers::rehasher_function_t *_rehasher = nullptr) const;

  Gamium::Protocol::Packets::HelloParamT *AsPackets_HelloParam() {
    return type == Param::Packets_HelloParam ?
      reinterpret_cast<Gamium::Protocol::Packets::HelloParamT *>(value) : nullptr;
  }
  const Gamium::Protocol::Packets::HelloParamT *AsPackets_HelloParam() const {
    return type == Param::Packets_HelloParam ?
      reinterpret_cast<const Gamium::Protocol::Packets::HelloParamT *>(value) : nullptr;
  }
  Gamium::Protocol::Packets::QueryScreenParamT *AsPackets_QueryScreenParam() {
    return type == Param::Packets_QueryScreenParam ?
      reinterpret_cast<Gamium::Protocol::Packets::QueryScreenParamT *>(value) : nullptr;
  }
  const Gamium::Protocol::Packets::QueryScreenParamT *AsPackets_QueryScreenParam() const {
    return type == Param::Packets_QueryScreenParam ?
      reinterpret_cast<const Gamium::Protocol::Packets::QueryScreenParamT *>(value) : nullptr;
  }
  Gamium::Protocol::Packets::FindObjectsParamT *AsPackets_FindObjectsParam() {
    return type == Param::Packets_FindObjectsParam ?
      reinterpret_cast<Gamium::Protocol::Packets::FindObjectsParamT *>(value) : nullptr;
  }
  const Gamium::Protocol::Packets::FindObjectsParamT *AsPackets_FindObjectsParam() const {
    return type == Param::Packets_FindObjectsParam ?
      reinterpret_cast<const Gamium::Protocol::Packets::FindObjectsParamT *>(value) : nullptr;
  }
  Gamium::Protocol::Packets::QueryObjectInteractableParamT *AsPackets_QueryObjectInteractableParam() {
    return type == Param::Packets_QueryObjectInteractableParam ?
      reinterpret_cast<Gamium::Protocol::Packets::QueryObjectInteractableParamT *>(value) : nullptr;
  }
  const Gamium::Protocol::Packets::QueryObjectInteractableParamT *AsPackets_QueryObjectInteractableParam() const {
    return type == Param::Packets_QueryObjectInteractableParam ?
      reinterpret_cast<const Gamium::Protocol::Packets::QueryObjectInteractableParamT *>(value) : nullptr;
  }
  Gamium::Protocol::Packets::ActionsParamT *AsPackets_ActionsParam() {
    return type == Param::Packets_ActionsParam ?
      reinterpret_cast<Gamium::Protocol::Packets::ActionsParamT *>(value) : nullptr;
  }
  const Gamium::Protocol::Packets::ActionsParamT *AsPackets_ActionsParam() const {
    return type == Param::Packets_ActionsParam ?
      reinterpret_cast<const Gamium::Protocol::Packets::ActionsParamT *>(value) : nullptr;
  }
  Gamium::Protocol::Packets::ExecuteRpcParamT *AsPackets_ExecuteRpcParam() {
    return type == Param::Packets_ExecuteRpcParam ?
      reinterpret_cast<Gamium::Protocol::Packets::ExecuteRpcParamT *>(value) : nullptr;
  }
  const Gamium::Protocol::Packets::ExecuteRpcParamT *AsPackets_ExecuteRpcParam() const {
    return type == Param::Packets_ExecuteRpcParam ?
      reinterpret_cast<const Gamium::Protocol::Packets::ExecuteRpcParamT *>(value) : nullptr;
  }
  Gamium::Protocol::Packets::InspectObjectOnScreenParamT *AsPackets_InspectObjectOnScreenParam() {
    return type == Param::Packets_InspectObjectOnScreenParam ?
      reinterpret_cast<Gamium::Protocol::Packets::InspectObjectOnScreenParamT *>(value) : nullptr;
  }
  const Gamium::Protocol::Packets::InspectObjectOnScreenParamT *AsPackets_InspectObjectOnScreenParam() const {
    return type == Param::Packets_InspectObjectOnScreenParam ?
      reinterpret_cast<const Gamium::Protocol::Packets::InspectObjectOnScreenParamT *>(value) : nullptr;
  }
  Gamium::Protocol::Packets::InspectObjectWithIdParamT *AsPackets_InspectObjectWithIdParam() {
    return type == Param::Packets_InspectObjectWithIdParam ?
      reinterpret_cast<Gamium::Protocol::Packets::InspectObjectWithIdParamT *>(value) : nullptr;
  }
  const Gamium::Protocol::Packets::InspectObjectWithIdParamT *AsPackets_InspectObjectWithIdParam() const {
    return type == Param::Packets_InspectObjectWithIdParam ?
      reinterpret_cast<const Gamium::Protocol::Packets::InspectObjectWithIdParamT *>(value) : nullptr;
  }
  Gamium::Protocol::Packets::DumpObjectsHierarchyParamT *AsPackets_DumpObjectsHierarchyParam() {
    return type == Param::Packets_DumpObjectsHierarchyParam ?
      reinterpret_cast<Gamium::Protocol::Packets::DumpObjectsHierarchyParamT *>(value) : nullptr;
  }
  const Gamium::Protocol::Packets::DumpObjectsHierarchyParamT *AsPackets_DumpObjectsHierarchyParam() const {
    return type == Param::Packets_DumpObjectsHierarchyParam ?
      reinterpret_cast<const Gamium::Protocol::Packets::DumpObjectsHierarchyParamT *>(value) : nullptr;
  }
  Gamium::Protocol::Packets::ChangeConfigurationParamT *AsPackets_ChangeConfigurationParam() {
    return type == Param::Packets_ChangeConfigurationParam ?
      reinterpret_cast<Gamium::Protocol::Packets::ChangeConfigurationParamT *>(value) : nullptr;
  }
  const Gamium::Protocol::Packets::ChangeConfigurationParamT *AsPackets_ChangeConfigurationParam() const {
    return type == Param::Packets_ChangeConfigurationParam ?
      reinterpret_cast<const Gamium::Protocol::Packets::ChangeConfigurationParamT *>(value) : nullptr;
  }
  Gamium::Protocol::Packets::QueryProfileParamT *AsPackets_QueryProfileParam() {
    return type == Param::Packets_QueryProfileParam ?
      reinterpret_cast<Gamium::Protocol::Packets::QueryProfileParamT *>(value) : nullptr;
  }
  const Gamium::Protocol::Packets::QueryProfileParamT *AsPackets_QueryProfileParam() const {
    return type == Param::Packets_QueryProfileParam ?
      reinterpret_cast<const Gamium::Protocol::Packets::QueryProfileParamT *>(value) : nullptr;
  }
};

bool VerifyParam(flatbuffers::Verifier &verifier, const void *obj, Param type);
bool VerifyParamVector(flatbuffers::Verifier &verifier, const flatbuffers::Vector<flatbuffers::Offset<void>> *values, const flatbuffers::Vector<Param> *types);

struct RequestT : public flatbuffers::NativeTable {
  typedef Request TableType;
  uint32_t seq = 0;
  Gamium::Protocol::ParamUnion param{};
};

struct Request FLATBUFFERS_FINAL_CLASS : private flatbuffers::Table {
  typedef RequestT NativeTableType;
  typedef RequestBuilder Builder;
  static const flatbuffers::TypeTable *MiniReflectTypeTable() {
    return RequestTypeTable();
  }
  enum FlatBuffersVTableOffset FLATBUFFERS_VTABLE_UNDERLYING_TYPE {
    VT_SEQ = 4,
    VT_PARAM_TYPE = 6,
    VT_PARAM = 8
  };
  uint32_t seq() const {
    return GetField<uint32_t>(VT_SEQ, 0);
  }
  Gamium::Protocol::Param param_type() const {
    return static_cast<Gamium::Protocol::Param>(GetField<uint8_t>(VT_PARAM_TYPE, 0));
  }
  const void *param() const {
    return GetPointer<const void *>(VT_PARAM);
  }
  template<typename T> const T *param_as() const;
  const Gamium::Protocol::Packets::HelloParam *param_as_Packets_HelloParam() const {
    return param_type() == Gamium::Protocol::Param::Packets_HelloParam ? static_cast<const Gamium::Protocol::Packets::HelloParam *>(param()) : nullptr;
  }
  const Gamium::Protocol::Packets::QueryScreenParam *param_as_Packets_QueryScreenParam() const {
    return param_type() == Gamium::Protocol::Param::Packets_QueryScreenParam ? static_cast<const Gamium::Protocol::Packets::QueryScreenParam *>(param()) : nullptr;
  }
  const Gamium::Protocol::Packets::FindObjectsParam *param_as_Packets_FindObjectsParam() const {
    return param_type() == Gamium::Protocol::Param::Packets_FindObjectsParam ? static_cast<const Gamium::Protocol::Packets::FindObjectsParam *>(param()) : nullptr;
  }
  const Gamium::Protocol::Packets::QueryObjectInteractableParam *param_as_Packets_QueryObjectInteractableParam() const {
    return param_type() == Gamium::Protocol::Param::Packets_QueryObjectInteractableParam ? static_cast<const Gamium::Protocol::Packets::QueryObjectInteractableParam *>(param()) : nullptr;
  }
  const Gamium::Protocol::Packets::ActionsParam *param_as_Packets_ActionsParam() const {
    return param_type() == Gamium::Protocol::Param::Packets_ActionsParam ? static_cast<const Gamium::Protocol::Packets::ActionsParam *>(param()) : nullptr;
  }
  const Gamium::Protocol::Packets::ExecuteRpcParam *param_as_Packets_ExecuteRpcParam() const {
    return param_type() == Gamium::Protocol::Param::Packets_ExecuteRpcParam ? static_cast<const Gamium::Protocol::Packets::ExecuteRpcParam *>(param()) : nullptr;
  }
  const Gamium::Protocol::Packets::InspectObjectOnScreenParam *param_as_Packets_InspectObjectOnScreenParam() const {
    return param_type() == Gamium::Protocol::Param::Packets_InspectObjectOnScreenParam ? static_cast<const Gamium::Protocol::Packets::InspectObjectOnScreenParam *>(param()) : nullptr;
  }
  const Gamium::Protocol::Packets::InspectObjectWithIdParam *param_as_Packets_InspectObjectWithIdParam() const {
    return param_type() == Gamium::Protocol::Param::Packets_InspectObjectWithIdParam ? static_cast<const Gamium::Protocol::Packets::InspectObjectWithIdParam *>(param()) : nullptr;
  }
  const Gamium::Protocol::Packets::DumpObjectsHierarchyParam *param_as_Packets_DumpObjectsHierarchyParam() const {
    return param_type() == Gamium::Protocol::Param::Packets_DumpObjectsHierarchyParam ? static_cast<const Gamium::Protocol::Packets::DumpObjectsHierarchyParam *>(param()) : nullptr;
  }
  const Gamium::Protocol::Packets::ChangeConfigurationParam *param_as_Packets_ChangeConfigurationParam() const {
    return param_type() == Gamium::Protocol::Param::Packets_ChangeConfigurationParam ? static_cast<const Gamium::Protocol::Packets::ChangeConfigurationParam *>(param()) : nullptr;
  }
  const Gamium::Protocol::Packets::QueryProfileParam *param_as_Packets_QueryProfileParam() const {
    return param_type() == Gamium::Protocol::Param::Packets_QueryProfileParam ? static_cast<const Gamium::Protocol::Packets::QueryProfileParam *>(param()) : nullptr;
  }
  bool Verify(flatbuffers::Verifier &verifier) const {
    return VerifyTableStart(verifier) &&
           VerifyField<uint32_t>(verifier, VT_SEQ, 4) &&
           VerifyField<uint8_t>(verifier, VT_PARAM_TYPE, 1) &&
           VerifyOffset(verifier, VT_PARAM) &&
           VerifyParam(verifier, param(), param_type()) &&
           verifier.EndTable();
  }
  RequestT *UnPack(const flatbuffers::resolver_function_t *_resolver = nullptr) const;
  void UnPackTo(RequestT *_o, const flatbuffers::resolver_function_t *_resolver = nullptr) const;
  static flatbuffers::Offset<Request> Pack(flatbuffers::FlatBufferBuilder &_fbb, const RequestT* _o, const flatbuffers::rehasher_function_t *_rehasher = nullptr);
};

template<> inline const Gamium::Protocol::Packets::HelloParam *Request::param_as<Gamium::Protocol::Packets::HelloParam>() const {
  return param_as_Packets_HelloParam();
}

template<> inline const Gamium::Protocol::Packets::QueryScreenParam *Request::param_as<Gamium::Protocol::Packets::QueryScreenParam>() const {
  return param_as_Packets_QueryScreenParam();
}

template<> inline const Gamium::Protocol::Packets::FindObjectsParam *Request::param_as<Gamium::Protocol::Packets::FindObjectsParam>() const {
  return param_as_Packets_FindObjectsParam();
}

template<> inline const Gamium::Protocol::Packets::QueryObjectInteractableParam *Request::param_as<Gamium::Protocol::Packets::QueryObjectInteractableParam>() const {
  return param_as_Packets_QueryObjectInteractableParam();
}

template<> inline const Gamium::Protocol::Packets::ActionsParam *Request::param_as<Gamium::Protocol::Packets::ActionsParam>() const {
  return param_as_Packets_ActionsParam();
}

template<> inline const Gamium::Protocol::Packets::ExecuteRpcParam *Request::param_as<Gamium::Protocol::Packets::ExecuteRpcParam>() const {
  return param_as_Packets_ExecuteRpcParam();
}

template<> inline const Gamium::Protocol::Packets::InspectObjectOnScreenParam *Request::param_as<Gamium::Protocol::Packets::InspectObjectOnScreenParam>() const {
  return param_as_Packets_InspectObjectOnScreenParam();
}

template<> inline const Gamium::Protocol::Packets::InspectObjectWithIdParam *Request::param_as<Gamium::Protocol::Packets::InspectObjectWithIdParam>() const {
  return param_as_Packets_InspectObjectWithIdParam();
}

template<> inline const Gamium::Protocol::Packets::DumpObjectsHierarchyParam *Request::param_as<Gamium::Protocol::Packets::DumpObjectsHierarchyParam>() const {
  return param_as_Packets_DumpObjectsHierarchyParam();
}

template<> inline const Gamium::Protocol::Packets::ChangeConfigurationParam *Request::param_as<Gamium::Protocol::Packets::ChangeConfigurationParam>() const {
  return param_as_Packets_ChangeConfigurationParam();
}

template<> inline const Gamium::Protocol::Packets::QueryProfileParam *Request::param_as<Gamium::Protocol::Packets::QueryProfileParam>() const {
  return param_as_Packets_QueryProfileParam();
}

struct RequestBuilder {
  typedef Request Table;
  flatbuffers::FlatBufferBuilder &fbb_;
  flatbuffers::uoffset_t start_;
  void add_seq(uint32_t seq) {
    fbb_.AddElement<uint32_t>(Request::VT_SEQ, seq, 0);
  }
  void add_param_type(Gamium::Protocol::Param param_type) {
    fbb_.AddElement<uint8_t>(Request::VT_PARAM_TYPE, static_cast<uint8_t>(param_type), 0);
  }
  void add_param(flatbuffers::Offset<void> param) {
    fbb_.AddOffset(Request::VT_PARAM, param);
  }
  explicit RequestBuilder(flatbuffers::FlatBufferBuilder &_fbb)
        : fbb_(_fbb) {
    start_ = fbb_.StartTable();
  }
  flatbuffers::Offset<Request> Finish() {
    const auto end = fbb_.EndTable(start_);
    auto o = flatbuffers::Offset<Request>(end);
    return o;
  }
};

inline flatbuffers::Offset<Request> CreateRequest(
    flatbuffers::FlatBufferBuilder &_fbb,
    uint32_t seq = 0,
    Gamium::Protocol::Param param_type = Gamium::Protocol::Param::NONE,
    flatbuffers::Offset<void> param = 0) {
  RequestBuilder builder_(_fbb);
  builder_.add_param(param);
  builder_.add_seq(seq);
  builder_.add_param_type(param_type);
  return builder_.Finish();
}

flatbuffers::Offset<Request> CreateRequest(flatbuffers::FlatBufferBuilder &_fbb, const RequestT *_o, const flatbuffers::rehasher_function_t *_rehasher = nullptr);

inline RequestT *Request::UnPack(const flatbuffers::resolver_function_t *_resolver) const {
  auto _o = std::unique_ptr<RequestT>(new RequestT());
  UnPackTo(_o.get(), _resolver);
  return _o.release();
}

inline void Request::UnPackTo(RequestT *_o, const flatbuffers::resolver_function_t *_resolver) const {
  (void)_o;
  (void)_resolver;
  { auto _e = seq(); _o->seq = _e; }
  { auto _e = param_type(); _o->param.type = _e; }
  { auto _e = param(); if (_e) _o->param.value = Gamium::Protocol::ParamUnion::UnPack(_e, param_type(), _resolver); }
}

inline flatbuffers::Offset<Request> Request::Pack(flatbuffers::FlatBufferBuilder &_fbb, const RequestT* _o, const flatbuffers::rehasher_function_t *_rehasher) {
  return CreateRequest(_fbb, _o, _rehasher);
}

inline flatbuffers::Offset<Request> CreateRequest(flatbuffers::FlatBufferBuilder &_fbb, const RequestT *_o, const flatbuffers::rehasher_function_t *_rehasher) {
  (void)_rehasher;
  (void)_o;
  struct _VectorArgs { flatbuffers::FlatBufferBuilder *__fbb; const RequestT* __o; const flatbuffers::rehasher_function_t *__rehasher; } _va = { &_fbb, _o, _rehasher}; (void)_va;
  auto _seq = _o->seq;
  auto _param_type = _o->param.type;
  auto _param = _o->param.Pack(_fbb);
  return Gamium::Protocol::CreateRequest(
      _fbb,
      _seq,
      _param_type,
      _param);
}

inline bool VerifyParam(flatbuffers::Verifier &verifier, const void *obj, Param type) {
  switch (type) {
    case Param::NONE: {
      return true;
    }
    case Param::Packets_HelloParam: {
      auto ptr = reinterpret_cast<const Gamium::Protocol::Packets::HelloParam *>(obj);
      return verifier.VerifyTable(ptr);
    }
    case Param::Packets_QueryScreenParam: {
      auto ptr = reinterpret_cast<const Gamium::Protocol::Packets::QueryScreenParam *>(obj);
      return verifier.VerifyTable(ptr);
    }
    case Param::Packets_FindObjectsParam: {
      auto ptr = reinterpret_cast<const Gamium::Protocol::Packets::FindObjectsParam *>(obj);
      return verifier.VerifyTable(ptr);
    }
    case Param::Packets_QueryObjectInteractableParam: {
      auto ptr = reinterpret_cast<const Gamium::Protocol::Packets::QueryObjectInteractableParam *>(obj);
      return verifier.VerifyTable(ptr);
    }
    case Param::Packets_ActionsParam: {
      auto ptr = reinterpret_cast<const Gamium::Protocol::Packets::ActionsParam *>(obj);
      return verifier.VerifyTable(ptr);
    }
    case Param::Packets_ExecuteRpcParam: {
      auto ptr = reinterpret_cast<const Gamium::Protocol::Packets::ExecuteRpcParam *>(obj);
      return verifier.VerifyTable(ptr);
    }
    case Param::Packets_InspectObjectOnScreenParam: {
      auto ptr = reinterpret_cast<const Gamium::Protocol::Packets::InspectObjectOnScreenParam *>(obj);
      return verifier.VerifyTable(ptr);
    }
    case Param::Packets_InspectObjectWithIdParam: {
      auto ptr = reinterpret_cast<const Gamium::Protocol::Packets::InspectObjectWithIdParam *>(obj);
      return verifier.VerifyTable(ptr);
    }
    case Param::Packets_DumpObjectsHierarchyParam: {
      auto ptr = reinterpret_cast<const Gamium::Protocol::Packets::DumpObjectsHierarchyParam *>(obj);
      return verifier.VerifyTable(ptr);
    }
    case Param::Packets_ChangeConfigurationParam: {
      auto ptr = reinterpret_cast<const Gamium::Protocol::Packets::ChangeConfigurationParam *>(obj);
      return verifier.VerifyTable(ptr);
    }
    case Param::Packets_QueryProfileParam: {
      auto ptr = reinterpret_cast<const Gamium::Protocol::Packets::QueryProfileParam *>(obj);
      return verifier.VerifyTable(ptr);
    }
    default: return true;
  }
}

inline bool VerifyParamVector(flatbuffers::Verifier &verifier, const flatbuffers::Vector<flatbuffers::Offset<void>> *values, const flatbuffers::Vector<Param> *types) {
  if (!values || !types) return !values && !types;
  if (values->size() != types->size()) return false;
  for (flatbuffers::uoffset_t i = 0; i < values->size(); ++i) {
    if (!VerifyParam(
        verifier,  values->Get(i), types->GetEnum<Param>(i))) {
      return false;
    }
  }
  return true;
}

inline void *ParamUnion::UnPack(const void *obj, Param type, const flatbuffers::resolver_function_t *resolver) {
  (void)resolver;
  switch (type) {
    case Param::Packets_HelloParam: {
      auto ptr = reinterpret_cast<const Gamium::Protocol::Packets::HelloParam *>(obj);
      return ptr->UnPack(resolver);
    }
    case Param::Packets_QueryScreenParam: {
      auto ptr = reinterpret_cast<const Gamium::Protocol::Packets::QueryScreenParam *>(obj);
      return ptr->UnPack(resolver);
    }
    case Param::Packets_FindObjectsParam: {
      auto ptr = reinterpret_cast<const Gamium::Protocol::Packets::FindObjectsParam *>(obj);
      return ptr->UnPack(resolver);
    }
    case Param::Packets_QueryObjectInteractableParam: {
      auto ptr = reinterpret_cast<const Gamium::Protocol::Packets::QueryObjectInteractableParam *>(obj);
      return ptr->UnPack(resolver);
    }
    case Param::Packets_ActionsParam: {
      auto ptr = reinterpret_cast<const Gamium::Protocol::Packets::ActionsParam *>(obj);
      return ptr->UnPack(resolver);
    }
    case Param::Packets_ExecuteRpcParam: {
      auto ptr = reinterpret_cast<const Gamium::Protocol::Packets::ExecuteRpcParam *>(obj);
      return ptr->UnPack(resolver);
    }
    case Param::Packets_InspectObjectOnScreenParam: {
      auto ptr = reinterpret_cast<const Gamium::Protocol::Packets::InspectObjectOnScreenParam *>(obj);
      return ptr->UnPack(resolver);
    }
    case Param::Packets_InspectObjectWithIdParam: {
      auto ptr = reinterpret_cast<const Gamium::Protocol::Packets::InspectObjectWithIdParam *>(obj);
      return ptr->UnPack(resolver);
    }
    case Param::Packets_DumpObjectsHierarchyParam: {
      auto ptr = reinterpret_cast<const Gamium::Protocol::Packets::DumpObjectsHierarchyParam *>(obj);
      return ptr->UnPack(resolver);
    }
    case Param::Packets_ChangeConfigurationParam: {
      auto ptr = reinterpret_cast<const Gamium::Protocol::Packets::ChangeConfigurationParam *>(obj);
      return ptr->UnPack(resolver);
    }
    case Param::Packets_QueryProfileParam: {
      auto ptr = reinterpret_cast<const Gamium::Protocol::Packets::QueryProfileParam *>(obj);
      return ptr->UnPack(resolver);
    }
    default: return nullptr;
  }
}

inline flatbuffers::Offset<void> ParamUnion::Pack(flatbuffers::FlatBufferBuilder &_fbb, const flatbuffers::rehasher_function_t *_rehasher) const {
  (void)_rehasher;
  switch (type) {
    case Param::Packets_HelloParam: {
      auto ptr = reinterpret_cast<const Gamium::Protocol::Packets::HelloParamT *>(value);
      return CreateHelloParam(_fbb, ptr, _rehasher).Union();
    }
    case Param::Packets_QueryScreenParam: {
      auto ptr = reinterpret_cast<const Gamium::Protocol::Packets::QueryScreenParamT *>(value);
      return CreateQueryScreenParam(_fbb, ptr, _rehasher).Union();
    }
    case Param::Packets_FindObjectsParam: {
      auto ptr = reinterpret_cast<const Gamium::Protocol::Packets::FindObjectsParamT *>(value);
      return CreateFindObjectsParam(_fbb, ptr, _rehasher).Union();
    }
    case Param::Packets_QueryObjectInteractableParam: {
      auto ptr = reinterpret_cast<const Gamium::Protocol::Packets::QueryObjectInteractableParamT *>(value);
      return CreateQueryObjectInteractableParam(_fbb, ptr, _rehasher).Union();
    }
    case Param::Packets_ActionsParam: {
      auto ptr = reinterpret_cast<const Gamium::Protocol::Packets::ActionsParamT *>(value);
      return CreateActionsParam(_fbb, ptr, _rehasher).Union();
    }
    case Param::Packets_ExecuteRpcParam: {
      auto ptr = reinterpret_cast<const Gamium::Protocol::Packets::ExecuteRpcParamT *>(value);
      return CreateExecuteRpcParam(_fbb, ptr, _rehasher).Union();
    }
    case Param::Packets_InspectObjectOnScreenParam: {
      auto ptr = reinterpret_cast<const Gamium::Protocol::Packets::InspectObjectOnScreenParamT *>(value);
      return CreateInspectObjectOnScreenParam(_fbb, ptr, _rehasher).Union();
    }
    case Param::Packets_InspectObjectWithIdParam: {
      auto ptr = reinterpret_cast<const Gamium::Protocol::Packets::InspectObjectWithIdParamT *>(value);
      return CreateInspectObjectWithIdParam(_fbb, ptr, _rehasher).Union();
    }
    case Param::Packets_DumpObjectsHierarchyParam: {
      auto ptr = reinterpret_cast<const Gamium::Protocol::Packets::DumpObjectsHierarchyParamT *>(value);
      return CreateDumpObjectsHierarchyParam(_fbb, ptr, _rehasher).Union();
    }
    case Param::Packets_ChangeConfigurationParam: {
      auto ptr = reinterpret_cast<const Gamium::Protocol::Packets::ChangeConfigurationParamT *>(value);
      return CreateChangeConfigurationParam(_fbb, ptr, _rehasher).Union();
    }
    case Param::Packets_QueryProfileParam: {
      auto ptr = reinterpret_cast<const Gamium::Protocol::Packets::QueryProfileParamT *>(value);
      return CreateQueryProfileParam(_fbb, ptr, _rehasher).Union();
    }
    default: return 0;
  }
}

inline ParamUnion::ParamUnion(const ParamUnion &u) : type(u.type), value(nullptr) {
  switch (type) {
    case Param::Packets_HelloParam: {
      value = new Gamium::Protocol::Packets::HelloParamT(*reinterpret_cast<Gamium::Protocol::Packets::HelloParamT *>(u.value));
      break;
    }
    case Param::Packets_QueryScreenParam: {
      value = new Gamium::Protocol::Packets::QueryScreenParamT(*reinterpret_cast<Gamium::Protocol::Packets::QueryScreenParamT *>(u.value));
      break;
    }
    case Param::Packets_FindObjectsParam: {
      value = new Gamium::Protocol::Packets::FindObjectsParamT(*reinterpret_cast<Gamium::Protocol::Packets::FindObjectsParamT *>(u.value));
      break;
    }
    case Param::Packets_QueryObjectInteractableParam: {
      value = new Gamium::Protocol::Packets::QueryObjectInteractableParamT(*reinterpret_cast<Gamium::Protocol::Packets::QueryObjectInteractableParamT *>(u.value));
      break;
    }
    case Param::Packets_ActionsParam: {
      value = new Gamium::Protocol::Packets::ActionsParamT(*reinterpret_cast<Gamium::Protocol::Packets::ActionsParamT *>(u.value));
      break;
    }
    case Param::Packets_ExecuteRpcParam: {
      value = new Gamium::Protocol::Packets::ExecuteRpcParamT(*reinterpret_cast<Gamium::Protocol::Packets::ExecuteRpcParamT *>(u.value));
      break;
    }
    case Param::Packets_InspectObjectOnScreenParam: {
      value = new Gamium::Protocol::Packets::InspectObjectOnScreenParamT(*reinterpret_cast<Gamium::Protocol::Packets::InspectObjectOnScreenParamT *>(u.value));
      break;
    }
    case Param::Packets_InspectObjectWithIdParam: {
      value = new Gamium::Protocol::Packets::InspectObjectWithIdParamT(*reinterpret_cast<Gamium::Protocol::Packets::InspectObjectWithIdParamT *>(u.value));
      break;
    }
    case Param::Packets_DumpObjectsHierarchyParam: {
      value = new Gamium::Protocol::Packets::DumpObjectsHierarchyParamT(*reinterpret_cast<Gamium::Protocol::Packets::DumpObjectsHierarchyParamT *>(u.value));
      break;
    }
    case Param::Packets_ChangeConfigurationParam: {
      value = new Gamium::Protocol::Packets::ChangeConfigurationParamT(*reinterpret_cast<Gamium::Protocol::Packets::ChangeConfigurationParamT *>(u.value));
      break;
    }
    case Param::Packets_QueryProfileParam: {
      value = new Gamium::Protocol::Packets::QueryProfileParamT(*reinterpret_cast<Gamium::Protocol::Packets::QueryProfileParamT *>(u.value));
      break;
    }
    default:
      break;
  }
}

inline void ParamUnion::Reset() {
  switch (type) {
    case Param::Packets_HelloParam: {
      auto ptr = reinterpret_cast<Gamium::Protocol::Packets::HelloParamT *>(value);
      delete ptr;
      break;
    }
    case Param::Packets_QueryScreenParam: {
      auto ptr = reinterpret_cast<Gamium::Protocol::Packets::QueryScreenParamT *>(value);
      delete ptr;
      break;
    }
    case Param::Packets_FindObjectsParam: {
      auto ptr = reinterpret_cast<Gamium::Protocol::Packets::FindObjectsParamT *>(value);
      delete ptr;
      break;
    }
    case Param::Packets_QueryObjectInteractableParam: {
      auto ptr = reinterpret_cast<Gamium::Protocol::Packets::QueryObjectInteractableParamT *>(value);
      delete ptr;
      break;
    }
    case Param::Packets_ActionsParam: {
      auto ptr = reinterpret_cast<Gamium::Protocol::Packets::ActionsParamT *>(value);
      delete ptr;
      break;
    }
    case Param::Packets_ExecuteRpcParam: {
      auto ptr = reinterpret_cast<Gamium::Protocol::Packets::ExecuteRpcParamT *>(value);
      delete ptr;
      break;
    }
    case Param::Packets_InspectObjectOnScreenParam: {
      auto ptr = reinterpret_cast<Gamium::Protocol::Packets::InspectObjectOnScreenParamT *>(value);
      delete ptr;
      break;
    }
    case Param::Packets_InspectObjectWithIdParam: {
      auto ptr = reinterpret_cast<Gamium::Protocol::Packets::InspectObjectWithIdParamT *>(value);
      delete ptr;
      break;
    }
    case Param::Packets_DumpObjectsHierarchyParam: {
      auto ptr = reinterpret_cast<Gamium::Protocol::Packets::DumpObjectsHierarchyParamT *>(value);
      delete ptr;
      break;
    }
    case Param::Packets_ChangeConfigurationParam: {
      auto ptr = reinterpret_cast<Gamium::Protocol::Packets::ChangeConfigurationParamT *>(value);
      delete ptr;
      break;
    }
    case Param::Packets_QueryProfileParam: {
      auto ptr = reinterpret_cast<Gamium::Protocol::Packets::QueryProfileParamT *>(value);
      delete ptr;
      break;
    }
    default: break;
  }
  value = nullptr;
  type = Param::NONE;
}

inline const flatbuffers::TypeTable *ParamTypeTable() {
  static const flatbuffers::TypeCode type_codes[] = {
    { flatbuffers::ET_SEQUENCE, 0, -1 },
    { flatbuffers::ET_SEQUENCE, 0, 0 },
    { flatbuffers::ET_SEQUENCE, 0, 1 },
    { flatbuffers::ET_SEQUENCE, 0, 2 },
    { flatbuffers::ET_SEQUENCE, 0, 3 },
    { flatbuffers::ET_SEQUENCE, 0, 4 },
    { flatbuffers::ET_SEQUENCE, 0, 5 },
    { flatbuffers::ET_SEQUENCE, 0, 6 },
    { flatbuffers::ET_SEQUENCE, 0, 7 },
    { flatbuffers::ET_SEQUENCE, 0, 8 },
    { flatbuffers::ET_SEQUENCE, 0, 9 },
    { flatbuffers::ET_SEQUENCE, 0, 10 }
  };
  static const flatbuffers::TypeFunction type_refs[] = {
    Gamium::Protocol::Packets::HelloParamTypeTable,
    Gamium::Protocol::Packets::QueryScreenParamTypeTable,
    Gamium::Protocol::Packets::FindObjectsParamTypeTable,
    Gamium::Protocol::Packets::QueryObjectInteractableParamTypeTable,
    Gamium::Protocol::Packets::ActionsParamTypeTable,
    Gamium::Protocol::Packets::ExecuteRpcParamTypeTable,
    Gamium::Protocol::Packets::InspectObjectOnScreenParamTypeTable,
    Gamium::Protocol::Packets::InspectObjectWithIdParamTypeTable,
    Gamium::Protocol::Packets::DumpObjectsHierarchyParamTypeTable,
    Gamium::Protocol::Packets::ChangeConfigurationParamTypeTable,
    Gamium::Protocol::Packets::QueryProfileParamTypeTable
  };
  static const flatbuffers::TypeTable tt = {
    flatbuffers::ST_UNION, 12, type_codes, type_refs, nullptr, nullptr, nullptr
  };
  return &tt;
}

inline const flatbuffers::TypeTable *RequestTypeTable() {
  static const flatbuffers::TypeCode type_codes[] = {
    { flatbuffers::ET_UINT, 0, -1 },
    { flatbuffers::ET_UTYPE, 0, 0 },
    { flatbuffers::ET_SEQUENCE, 0, 0 }
  };
  static const flatbuffers::TypeFunction type_refs[] = {
    Gamium::Protocol::ParamTypeTable
  };
  static const flatbuffers::TypeTable tt = {
    flatbuffers::ST_TABLE, 3, type_codes, type_refs, nullptr, nullptr, nullptr
  };
  return &tt;
}

inline const Gamium::Protocol::Request *GetRequest(const void *buf) {
  return flatbuffers::GetRoot<Gamium::Protocol::Request>(buf);
}

inline const Gamium::Protocol::Request *GetSizePrefixedRequest(const void *buf) {
  return flatbuffers::GetSizePrefixedRoot<Gamium::Protocol::Request>(buf);
}

inline bool VerifyRequestBuffer(
    flatbuffers::Verifier &verifier) {
  return verifier.VerifyBuffer<Gamium::Protocol::Request>(nullptr);
}

inline bool VerifySizePrefixedRequestBuffer(
    flatbuffers::Verifier &verifier) {
  return verifier.VerifySizePrefixedBuffer<Gamium::Protocol::Request>(nullptr);
}

inline void FinishRequestBuffer(
    flatbuffers::FlatBufferBuilder &fbb,
    flatbuffers::Offset<Gamium::Protocol::Request> root) {
  fbb.Finish(root);
}

inline void FinishSizePrefixedRequestBuffer(
    flatbuffers::FlatBufferBuilder &fbb,
    flatbuffers::Offset<Gamium::Protocol::Request> root) {
  fbb.FinishSizePrefixed(root);
}

inline std::unique_ptr<Gamium::Protocol::RequestT> UnPackRequest(
    const void *buf,
    const flatbuffers::resolver_function_t *res = nullptr) {
  return std::unique_ptr<Gamium::Protocol::RequestT>(GetRequest(buf)->UnPack(res));
}

inline std::unique_ptr<Gamium::Protocol::RequestT> UnPackSizePrefixedRequest(
    const void *buf,
    const flatbuffers::resolver_function_t *res = nullptr) {
  return std::unique_ptr<Gamium::Protocol::RequestT>(GetSizePrefixedRequest(buf)->UnPack(res));
}

}  // namespace Protocol
}  // namespace Gamium

#endif  // FLATBUFFERS_GENERATED_REQUEST_GAMIUM_PROTOCOL_H_